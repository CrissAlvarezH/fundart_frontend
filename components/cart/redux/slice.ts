import {CartProduct, ImagePhoneCaseId} from "@/components/cart/redux/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type Cart = {
    [key: ImagePhoneCaseId]: CartProduct
}

export interface CartInitialState {
    cart: Cart
}

const initialState: CartInitialState = {
    cart: {}
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<CartProduct>) => {
            state.cart[action.payload.imagePhoneCase.id] = action.payload
        },
        incrementOneUnitToCart: (state, action: PayloadAction<ImagePhoneCaseId>) => {
            state.cart[action.payload].quantity = state.cart[action.payload].quantity + 1
        },
        decrementOneUnitToCart: (state, action: PayloadAction<ImagePhoneCaseId>) => {
            state.cart[action.payload].quantity = state.cart[action.payload].quantity - 1
        },
    }
})

export const {
    addProductToCart,
    incrementOneUnitToCart,
    decrementOneUnitToCart
} = cartSlice.actions

export default cartSlice.reducer
