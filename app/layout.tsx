import "./globals.css"
import { Inter, Playfair_Display } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata = {
  title: "crushcultureOS",
  description: "crushcultureOS",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🪩</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    title: "crushcultureOS",
    description: "crushcultureOS",
    type: "website",
    siteName: "crushcultureOS",
  },
  twitter: {
    card: "summary_large_image",
    title: "crushcultureOS",
    description: "crushcultureOS",
    creator: "@lonelyheartsclubcode",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  )
}
///


import './globals.css'