import type React from "react"
import type { Metadata } from "next"
import { Inter, Rye } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const rye = Rye({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-western",
})

export const metadata: Metadata = {
  title: "Royal 1899 - Georgian Wild West RedM Server",
  description:
    "Premium Georgian-language RedM roleplay server set in the authentic American Wild West of 1899. Join the frontier and experience the best of Georgian gaming community.",
  keywords: "RedM, Georgian, Wild West, Roleplay, Gaming, 1899, Server",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ka" className={`${inter.className} ${rye.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
