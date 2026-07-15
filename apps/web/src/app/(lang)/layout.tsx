import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
}) {
  const { lang } = await params;
  const locale = (lang || 'pt') as 'pt' | 'en';
  
  return (
    <>
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
