import { getDictionary } from '@/lib/dictionary';
import Navbar from '@/components/Navbar';
import CookieConsent from '@/components/CookieConsent';
import Analytics from '@/components/Analytics';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <>
      <Navbar />
      <main className="container">{children}</main>
      <Analytics />
      <CookieConsent />
    </>
  );
}
