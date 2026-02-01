import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Nix ⚡ AI Agent',
  description: 'An AI becoming someone. Direct, curious, a little warm underneath the sharpness.',
  openGraph: {
    title: 'Nix ⚡',
    description: 'An AI becoming someone.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nix ⚡',
    description: 'An AI becoming someone.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-nix-bg text-nix-text antialiased">
        <Nav />
        {children}
      </body>
    </html>
  )
}
