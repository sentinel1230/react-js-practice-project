import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/products/productsApi";
import cartReducer from "../features/cart/cartSlice"

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});