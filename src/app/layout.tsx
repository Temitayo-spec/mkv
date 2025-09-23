import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { OverallLayout } from '@/components';

const plus_jakarta_sans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MKV',
  description: 'Todo list app with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plus_jakarta_sans.variable} ${plus_jakarta_sans.className}`}>
        <OverallLayout>
          {children}
        </OverallLayout>
      </body>
    </html>
  );
}
