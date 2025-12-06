import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang?: string };
}) {
  const locale = (params.lang || 'pt') as 'pt' | 'en';
  
  return (
    <>
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
