import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CartProvider } from "@/contexts/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"
import "./globals.css"

export const metadata: Metadata = {
  title: "Loja D4590",
  description: "Loja de produtos do Distrito D4590",
  icons: {
    icon: "/logo.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <CartProvider>
          <Suspense
            fallback={
              <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d41367] mx-auto mb-4"></div>
                  <p className="text-gray-600 font-light">Carregando...</p>
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
          <CartSidebar />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
