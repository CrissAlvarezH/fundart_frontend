'use client'

import {NextUIProvider} from '@nextui-org/react'
import {CartProvider} from "@/components/cart/redux/provider";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <CartProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </CartProvider>
    )
}