'use client';
import { titleFont } from '@/config/fonts';

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  return (
    <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
      Stock: 150
    </h1>
  );
};
