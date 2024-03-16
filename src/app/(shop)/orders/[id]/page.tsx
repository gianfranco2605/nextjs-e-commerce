import { Title } from '@/components';
import Link from 'next/link';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrderPage({ params }: Props) {
  const { id } = params;

  // Call server action
  // Todo Check
  // Todo Redirect
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div
            className={clsx(
              'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-2.5',
              { 'bg-red-500': false, 'bg-green-700': true },
            )}
          >
            <IoCardOutline size={30} />
            {/* <span className="mx-2">Pending</span> */}
            <span className="mx-2">Paid</span>
          </div>

          {/* Items */}
          {productsInCart.map((product) => (
            <div key={product.slug} className="flex mb-5">
              <Image
                src={`/products/${product.images[0]}`}
                width={100}
                height={100}
                alt={product.title}
                style={{ width: '100px', height: '100px' }}
                className="mr-5 rounded"
              />
              <div>
                <p>{product.title}</p>
                <p>${product.price} x 3</p>
                <p className="font-bold">SubTotal: ${product.price * 3}</p>
                <button className="underline mt-3">Remover</button>
              </div>
            </div>
          ))}
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
            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-2.5',
                { 'bg-red-500': false, 'bg-green-700': true },
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pending</span> */}
              <span className="mx-2">Paid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
