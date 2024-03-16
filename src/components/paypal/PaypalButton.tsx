'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js';
import { paypalCheckPayment, setTransactionId } from '@/actions';

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-300 rounded" />
        <div className="h-12 bg-gray-300 rounded my-2" />
        <div className="h-12 bg-gray-300 rounded" />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions,
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          //invoice_id: 'order_id',
          amount: {
            value: `${roundedAmount}`,
          },
        },
      ],
    });
    const { ok } = await setTransactionId(orderId, transactionId);

    if (!ok) {
      throw new Error('Order was not updated');
    }

    return transactionId;
  };
  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    console.log('on aprrove');

    const details = await actions.order?.capture();

    if (!details) return;

    await paypalCheckPayment(details.id!);
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
