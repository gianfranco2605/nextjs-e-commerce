'use client';

import { QuantitySelector, SizeSelector } from '@/components';
import { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import { useState } from 'react';

interface Props {
  product: Product;
}

const AddToCart = ({ product }: Props) => {
  const addproductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      images: product.images[0],
    };

    addproductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="fade-in mt-2 text-red-500">
          You need to pick a size*
        </span>
      )}
      <p className="text-lg mb-5">${product.price} </p>
      {/* Size Selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      <button onClick={addToCart} className="btn-primary my-5">
        Add to cart
      </button>
    </>
  );
};

export default AddToCart;
