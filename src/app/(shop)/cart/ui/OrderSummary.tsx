'use client';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { useEffect, useState } from 'react';

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="grid grid-cols-2">
      <span className="">Number Of Products</span>
      <span className="text-right">
        {itemsInCart === 1 ? ' 1 Item' : `${itemsInCart} Items`}
      </span>

      <span className="">SubTotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span className="">Tax (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
