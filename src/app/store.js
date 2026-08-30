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

store.subscribe(() => {
    try {
        localStorage.setItem("cart", JSON.stringify(store.getState().cart.items));
    } catch (err) {
        console.error("Failed to persist cart to localStorage", err);
    }
});