import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Products from "./pages/products/Products.jsx";
import Cart from "./pages/cart/Cart.jsx";
import ProductDetail from "./pages/productDetail/ProductDetail.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";

import "./App.css";

const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Navigate to="/products" replace />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/products/:id",
                element: <ProductDetail />
            },
            {
                path: "/cart",
                element: <Cart />
            }
        ]
    }
], {
    basename: process.env.NODE_ENV === "production" ? "react-js-practice-project" : "/",
})

export default function App() {
    return <RouterProvider router={router} />
}