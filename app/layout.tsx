import './globals.css'
import type { Metadata } from 'next'
import {Header} from "@/components/header/Header";
import {NextUi} from "@/app/providers";

export const metadata: Metadata = {
  title: 'Fundart',
  description: 'Cases y Fundar para Celular creadas con IA',
}

export default function RootLayout({children, modal}: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    <html lang="en">
        <body>
            <NextUi>
                <div>
                    <Header />
                    {children}
                    {modal}
                </div>
            </NextUi>
        </body>
    </html>
  )
}
