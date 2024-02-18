'use client';
import { useState } from 'react';
import { QuantitySelector, SizeSelector } from '@/components';
import { Product, Size } from '@/interfaces';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 fade-in text-red-500">Please select a size*</span>
      )}
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
