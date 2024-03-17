import { PayPalButton, Title } from '@/components';
import Image from 'next/image';

import { getOrderById } from '@/actions/order/get-order-by-id';
import { redirect } from 'next/navigation';
import { currencyFormat } from '@/utils';
import OrderStatus from '@/components/orders/OrderStatus';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderByIdPage({ params }: Props) {
  const { id } = params;

  // Call server action
  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }

  const address = order!.OrderAddress;

  // Todo Check
  // Todo Redirect
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <OrderStatus isPaid={order?.isPaid ?? false} />
          {/* Items */}
          {order!.OrderItem.map((item) => (
            <div
              key={item.product.slug + '-' + item.size}
              className="flex mb-5"
            >
              <Image
                src={`/products/${item.product.ProductImage[0].url}`}
                width={100}
                height={100}
                alt={item.product.title}
                style={{ width: '100px', height: '100px' }}
                className="mr-5 rounded"
              />
              <div>
                <p>{item.product.title}</p>
                <p>
                  ${item.price} x {item.quantity}
                </p>
                <p className="font-bold">
                  SubTotal: {currencyFormat(item.price * item.quantity)}
                </p>
                <button className="underline mt-3">Remover</button>
              </div>
            </div>
          ))}
        </div>
        {/* Checkout */}
        <div className="bg-white rounded-xl shadow-xl p-7">
          <h2 className="underline mb-2 pb-2 text-2xl ">Shipping Address</h2>
          <div className="mb-10">
            <p className="text-xl">
              {address!.firstName} {address!.lastName}
            </p>
            <p>{address!.address!}</p>
            <p>{address!.address2}</p>
            <p>{address!.postalCode}</p>
            <p>
              {address!.city}, {address!.countryId}
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
          <h2 className="text-2xl mb-2">Order</h2>

          <div className="grid grid-cols-2">
            <span>No. Products</span>
            <span className="text-right">
              {order?.itemsInOrder === 1
                ? '1 artículo'
                : `${order?.itemsInOrder} artículos`}
            </span>

            <span>Subtotal</span>
            <span className="text-right">
              {currencyFormat(order!.subTotal)}
            </span>

            <span>Impuestos (15%)</span>
            <span className="text-right">{currencyFormat(order!.tax)}</span>

            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-right">
              {currencyFormat(order!.total)}
            </span>
          </div>
          <div className="mt-5 mb-2 w-full">
            {order?.isPaid ? (
              <OrderStatus isPaid={order?.isPaid ?? false} />
            ) : (
              <PayPalButton amount={order!.total} orderId={order!.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
