export const revalidate = 10080; //7 days

import { getProductBySlug } from '@/actions';
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from '@/components';

import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import AddToCart from './ui/AddToCart';

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Product not found',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Product not found',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  };
}

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        {/* Mobile slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>
      {/* Details */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />

        <AddToCart product={product} />
        {/* Description */}
        <h3 className="font-bold text-sm ">Description</h3>
        <h3 className="font-light">{product.description}</h3>
      </div>
    </div>
  );
}
