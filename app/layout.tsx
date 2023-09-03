import './globals.css'
import type { Metadata } from 'next'
import {Header} from "@/components/header/Header";
import {Providers} from "@/app/providers";
import {CartProvider} from "@/components/cart/redux/provider";

export default function RootLayout({children, modal}: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    <html lang="en">
        <body>
            <Providers>
                <div>
                    <Header />
                    {children}
                    {modal}
                </div>
            </Providers>
        </body>
    </html>
  )
}
