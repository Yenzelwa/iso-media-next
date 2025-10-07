import '../../globals.css'
import type { Metadata } from 'next'
import React from 'react'
import ClientProviders from '../ClientProviders'
import { Footer } from '@/src/components/Footer'
import { Navigation } from '@/src/components/Navigation'

export const metadata: Metadata = {
  title: {
    default: 'ISO Media',
    template: '%s | ISO Media',
  },
  description: 'Stream documentaries and series on ISO Media.',
  openGraph: {
    title: 'ISO Media',
    description: 'Stream documentaries and series on ISO Media.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <div className="flex flex-col h-screen justify-between">
            <Navigation />
            {children}
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}
