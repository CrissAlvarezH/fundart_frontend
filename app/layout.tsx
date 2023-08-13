import './globals.css'
import type { Metadata } from 'next'
import {Header} from "@/components/Header";

export const metadata: Metadata = {
  title: 'Fundart',
  description: 'Cases y Fundar para Celular creadas con IA',
}

export default function RootLayout({children, modal}: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    <html lang="en">
        <body>
            <div>
                <Header />
                {children}
                {modal}
            </div>
        </body>
    </html>
  )
}
