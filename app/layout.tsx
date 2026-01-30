import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import { portfolioData } from '@/constants/data'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira' })

export const metadata: Metadata = {
  title: `${portfolioData.name} | ${portfolioData.role}`,
  description: portfolioData.about,
  keywords: ['AI Engineer', 'Full Stack Developer', 'Portfolio', 'Machine Learning', 'Next.js', 'React', ...portfolioData.skills],
  authors: [{ name: portfolioData.name }],
  openGraph: {
    title: `${portfolioData.name} | AI Engineer Portfolio`,
    description: portfolioData.about,
    url: 'https://harshdayal.com',
    siteName: `${portfolioData.name} Portfolio`,
    images: [
      {
        url: '/og-image.png', // You should add an OG image to your public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${portfolioData.name} | AI Engineer Portfolio`,
    description: portfolioData.about,
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${firaCode.variable} font-sans bg-[#020617] text-gray-200 antialiased`}>
        {children}
      </body>
    </html>
  )
}
