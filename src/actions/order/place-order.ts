'use server';

import { auth } from '@/auth.config';
import { Address, Size } from '@/interfaces';
import prisma from '@/lib/prisma';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address,
) => {
  const session = await auth();

  const userId = session?.user.id;

  //   Check User session
  if (!userId) {
    return {
      ok: false,
      message: 'No user Session',
    };
  }

  //   Get Products info
  // Remember we can take 2+ products with the same id
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;

      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} does not exist - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 },
  );

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // Update stock in products
      const updatedProductsPromises = products.map(async (product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(
            `${product.id} does not have a quantity of ${product}`,
          );
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity, !Not to do
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updateProducts = await Promise.all(updatedProductsPromises);

      // Check if negative values exist
      updateProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} not enough in stock`);
        }
      });
      // Create Order
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // 3. Crear la direccion de la orden
      // Address
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          orderId: order.id, // Associating the order address with the order
          countryId: country,
        },
      });

      return {
        order: updateProducts,
        updateProducts: [],
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
