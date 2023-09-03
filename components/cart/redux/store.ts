import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./slice"

export const cartStore = configureStore({
    reducer: {
        cart: cartReducer,
    }
})


export type CartStore = ReturnType<typeof cartStore.getState>
