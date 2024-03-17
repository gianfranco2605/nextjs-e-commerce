import clsx from 'clsx';
import React from 'react';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  isPaid: boolean;
}

const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={clsx(
        'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
        { 'bg-red-500': !isPaid, 'bg-green-700': isPaid },
      )}
    >
      <IoCardOutline size={30} />
      {/* <span className="mx-2">Pending</span> */}
      <span className="mx-2">{isPaid ? 'Paid' : 'To Paid'}</span>
    </div>
  );
};

export default OrderStatus;
