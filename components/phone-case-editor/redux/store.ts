import {configureStore} from "@reduxjs/toolkit";
import imageReducer from "./slice"


export const store = configureStore({
    reducer: {
        images: imageReducer,
    },
})


export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
