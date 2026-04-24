// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trisk — Power. Trust. Dynamic.',
  description: 'Your kink community. Track your dynamic, connect with the scene, and live your truth.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Trisk',
  },
  openGraph: {
    title: 'Trisk',
    description: 'Power. Trust. Dynamic.',
    type: 'website',
    url: 'https://trisk.app',
  },
};

export const viewport: Viewport = {
  themeColor: '#080806',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-void text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
