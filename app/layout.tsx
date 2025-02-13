import "./globals.css"
import { Inter, Playfair_Display } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata = {
  title: "Valentine's Menu",
  description: "A special Valentine's Day menu with a selection of romantic dishes including Salmon Sashimi, Miso-Glazed Black Cod, and Matcha Crème Brûlée.",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">😍</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    title: "Valentine's Day Menu 💝",
    description: "A special Valentine's Day menu with a selection of romantic dishes including Salmon Sashimi, Miso-Glazed Black Cod, and Matcha Crème Brûlée.",
    type: "website",
    siteName: "Valentine's Menu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentine's Day Menu 💝",
    description: "A special Valentine's Day menu with a selection of romantic dishes including Salmon Sashimi, Miso-Glazed Black Cod, and Matcha Crème Brûlée.",
    creator: "@nayu",
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