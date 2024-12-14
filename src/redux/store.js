import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { productReducer } from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";

export const store = configureStore({
    reducer:{
        userReducer,
        productReducer,
        cartReducer
    }
})
