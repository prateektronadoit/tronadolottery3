import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ClientLayoutShell from './ClientLayoutShell';
import { usePathname } from 'next/navigation';

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
