import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Calcudate',
  description: 'Date calculation, made easy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer className="text-center py-4">
          <p className="text-sm text-gray-600">
            This website does not track you.
          </p>
        </footer>
      </body>
    </html>
  );
}
