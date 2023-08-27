import { Provider } from "react-redux"
import { store } from "./store"
import {Children} from "react";


export function PhoneCaseProvider({children}: {children: any}){
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
