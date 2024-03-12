import { Title } from '@/components';
import Link from 'next/link';

import Image from 'next/image';
import { ProductsInCart } from '../../cart/ui/ProductsInCart';

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Order Check" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Re-Check Order</span>

            <Link href="/cart" className="underline mb-5">
              Edit Order
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="underline mb-2 pb-2 text-2xl ">Shipping Address</h2>
            <div className="mb-10">
              <p className="text-xl">Gian</p>
              <p>Piazza Istria </p>
              <p>Roma</p>
              <p>Lazio</p>
              <p>00198</p>
              <p>tel: 338-283-55-94</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Order</h2>

            <div className="grid grid-cols-2">
              <span className="">Number Of Products</span>
              <span className="text-right">3 Items</span>

              <span className="">SubTotal</span>
              <span className="text-right">$100</span>

              <span className="">Tax (15%)</span>
              <span className="text-right">$15</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$115</span>
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
              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Payment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
