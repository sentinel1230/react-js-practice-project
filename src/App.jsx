import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/home/Home.jsx";
import Products from "./pages/products/Products.jsx";
import Cart from "./pages/cart/Cart.jsx";

import "./App.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/cart",
                element: <Cart />
            }
        ]
    }
])

export default function App() {
    return <RouterProvider router={router} />
}