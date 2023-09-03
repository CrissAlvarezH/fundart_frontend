"use client"
import {CartProvider} from "@/components/cart/redux/provider";
import {HeaderContent} from "@/components/header/HeaderContent";

export function Header() {
     return (
         // <CartProvider>
             <HeaderContent />
         // </CartProvider>
     )
}