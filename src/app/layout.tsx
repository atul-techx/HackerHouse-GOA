import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hhgoa2026.vercel.app'),
  title: 'HH Goa 2026 — Frame & Builder ID Generator (#FrameInGoa)',
  description: 'Instantly generate your official HH Goa 2026 profile picture frame and Builder ID badge. Build in Goa, ship from paradise!',
  keywords: ['HH Goa 2026', 'FrameInGoa', 'Hacker House Goa', 'Builder ID Generator', 'PFP Frame', 'Goa Hackathon'],
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
      <body className="min-h-screen bg-goa-dark text-goa-cream antialiased selection:bg-goa-pink selection:text-white">
        {children}
      </body>
    </html>
  );
}
