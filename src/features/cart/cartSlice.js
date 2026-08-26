import { createSlice } from "@reduxjs/toolkit";

function loadCartFromStorage() {
    try {
        const raw = localStorage.getItem("cart");
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: loadCartFromStorage(),
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.items.find((i) => i.id === product.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    quantity: 1,
                });
            }

            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((i) => i.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;

            if (quantity <= 0) {
                state.items = state.items.filter((i) => i.id !== id);
            } else {
                const item = state.items.find((i) => i.id === id);
                if (item) item.quantity = quantity;
            }

            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;