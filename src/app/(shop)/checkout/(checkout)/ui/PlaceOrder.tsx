'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { placeOrder } from '@/actions';
import { useCartStore, userAdressStore } from '@/store';
import { currencyFormat } from '@/utils';

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = userAdressStore((state) => state.address);

  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  );

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  //   Function to do just 1 order
  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    // await sleep(2);
    // Server action
    const resp = await placeOrder(productToOrder, address);

    setIsPlacingOrder(false);
  };

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="underline mb-2 pb-2 text-2xl ">Shipping Address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.city}</p>
        <p>{address.postalCode}</p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
      <h2 className="text-2xl mb-2">Order</h2>

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
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <p className="mb-5 text-center">
          {/* Disclaimer */}
          <span className="text-xs">
            By clicking on payment, you agree to our{' '}
            <a href="#" className="underline">
              Terms and Conditions of Use
            </a>{' '}
            and{' '}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </span>
        </p>
        <p className="text-red-500">Creation Error</p>
        <button
          onClick={onPlaceOrder}
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
          // href="/orders/123"
        >
          Payment
        </button>
      </div>
    </div>
  );
};
