import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ClientLayoutShell from './ClientLayoutShell';
import { usePathname } from 'next/navigation';
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '700'],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tronado Lottery",
  description: "A decentralized lottery platform",
  icons: {
    icon: "/T.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script src="/assets/scripts/lang-config.js" strategy="beforeInteractive" />
        <Script src="/assets/scripts/translation.js" strategy="beforeInteractive" />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Providers>
          {typeof window !== 'undefined' && window.location.pathname === '/about' ? (
            <ClientLayoutShell>{children}</ClientLayoutShell>
          ) : (
            children
          )}
        </Providers>
      </body>
    </html>
  );
}
