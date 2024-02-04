import Image from 'next/image';

import { ProductGrid, Title } from '@/components';
import { initialData } from '@/seed/seed';

const products = initialData.products;
export default function Home() {
  return (
    <>
      <Title title="Store" subtitle="All Products" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}