import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hhgoa2026.vercel.app'),
  title: 'HH Goa 2026 — Frame & Builder ID Generator (#FrameInGoa)',
  description: 'Instantly generate your official HH Goa 2026 profile picture frame and Builder ID badge. Build in Goa, ship from paradise!',
  keywords: ['HH Goa 2026', 'FrameInGoa', 'Hacker House Goa', 'Builder ID Generator', 'PFP Frame', 'Goa Hackathon'],
  icons: {
    icon: '/logo.png',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'HH Goa 2026 — Frame & Builder ID Generator',
    description: 'Create your official HH Goa 2026 Builder ID badge and PFP frame in seconds!',
    url: 'https://hhgoa2026.vercel.app',
    siteName: 'HH Goa 2026',
    images: [
      {
        url: '/api/og?title=HH%20GOA%202026&role=BUILD%20IN%20GOA,%20SHIP%20FROM%20PARADISE',
        width: 1200,
        height: 630,
        alt: 'HH Goa 2026 Builder Badge',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HH Goa 2026 — Builder ID & Frame Generator',
    description: 'Get your official HH Goa 2026 Builder ID badge & PFP overlay! #FrameInGoa',
    images: ['/api/og?title=HH%20GOA%202026&role=BUILD%20IN%20GOA,%20SHIP%20FROM%20PARADISE'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Playfair+Display:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-goa-dark text-goa-cream antialiased selection:bg-goa-pink selection:text-white">
        {children}
      </body>
    </html>
  );
}
