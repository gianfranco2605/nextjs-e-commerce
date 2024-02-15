import { initialData } from './seed';
import prisma from '../lib/prisma';

async function main() {
  //   await prisma.productImage.deleteMany();
  //   await prisma.product.deleteMany();
  //   await prisma.category.deleteMany();

  //   Or
  //   Delete preview data
  await Promise.all([
    await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.category.deleteMany(),
  ]);

  const { categories, products } = initialData;

  //Categories
  const categoriesData = categories.map((name) => ({ name }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); // 1string=shirt, 2string=categoryID

  //Products
  //   1 product
  //   const { images, type, ...product1 } = products[0];
  //   await prisma.product.create({
  //     data: {
  //       ...product1,
  //       categoryId: categoriesMap['shirts'],
  //     },
  //   });

  //   all Products
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    //   Images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));
    await prisma.productImage.createMany({
      data: imagesData,
    });
  });
}

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();
