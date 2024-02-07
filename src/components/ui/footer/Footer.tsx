import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export default function FooterPage() {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/" className="">
        <span className={`${titleFont.className} antialiased font-bold`}>
          Navas
        </span>
        <span>| Shop</span>
        <span>© {new Date().getFullYear()} </span>
      </Link>

      <Link href="/" className="mx-3">
        Locations: Rome-Miami-Costa Rica
      </Link>
    </div>
  );
}
