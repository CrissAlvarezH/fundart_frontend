"use client"
import {Provider} from "react-redux";
import {cartStore} from "@/components/cart/redux/store";


export function CartProvider({children}: {children: any}) {
    return (
        <Provider store={cartStore}>
            {children}
        </Provider>
    )
}