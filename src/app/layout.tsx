import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/context/LanguageContext"
import GSAPInitializer from "@/components/GSAPInitializer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GWAPO | Web Development, Visual Identity & RPA Solutions",
  description:
    "GWAPO specializes in creating complete websites, landing pages, visual identity, and RPA solutions to enhance your business.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <GSAPInitializer>
            <div className="dark-theme">{children}</div>
          </GSAPInitializer>
        </LanguageProvider>
      </body>
    </html>
  )
}
