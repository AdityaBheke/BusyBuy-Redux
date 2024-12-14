import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { productReducer } from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";
import { orderReducer } from "./slices/orderSlice";

// Configuring the Redux store with the defined reducers
export const store = configureStore({
    reducer: {
        userReducer, // Managing user state
        productReducer, // Managing product state
        cartReducer, // Managing cart state
        orderReducer // Managing order state
    }
});
