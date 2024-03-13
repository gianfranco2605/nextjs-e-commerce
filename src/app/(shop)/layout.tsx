import { Sidebar, TopMenu } from '@/components';
import FooterPage from '@/components/ui/footer/Footer';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="px-10 sm:px-7">{children}</div>
      <FooterPage />
    </main>
  );
}
