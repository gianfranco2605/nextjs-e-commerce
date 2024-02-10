import { ProductGrid, Title } from '@/components';
import { getPaginatedProductsWithImages } from '@/actions';

export default async function Home() {
  const { products } = await getPaginatedProductsWithImages();
  console.log(products);

  return (
    <>
      <Title title="Store" subtitle="All Products" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
