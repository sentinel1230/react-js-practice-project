import styles from "./Products.module.css";
import SideBar from "./components/sideBar/SideBar";
import ProductCard from "./components/productCard.jsx/ProductCard";
import Select from "./components/select/Select";

import { useCategoryProducts } from "./hooks/useCategoryProducts";
import { useProductFilters } from "./hooks/useProductFilters";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";

import { useState } from "react";

export default function Products() {
    const [sidebarCategory, setSidebarCategory] = useState("")
    const { products, isLoading, isFetching, isError, error, hasMore, loadMore } = useCategoryProducts(sidebarCategory)
    const {
        selectedBrand, setSelectedBrand,
        selectedPrice, setSelectedPrice,
        availableBrands, filteredProducts,
    } = useProductFilters(products)

    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.items)

    const handleAddToCart = (product) => dispatch(addToCart(product))
    const handleRemoveFromCart = (productId) => dispatch(removeFromCart(productId))

    return (
        <div className={styles.main}>
            <div className={styles.contentLayout}>
                <div className={styles.sideBar}>
                    <SideBar activeCat={sidebarCategory} onChangeCat={setSidebarCategory} />
                </div>

                <main className={styles.catalogContainer}>
                    <nav className={styles.breadcrumbs}>
                        <span>Products</span>
                        <span>{sidebarCategory}</span>
                    </nav>

                    <div className={styles.filterToolbar}>
                        <div className={styles.dropdownsGroup}>
                            <Select title="Brand" options={availableBrands} value={selectedBrand} onChange={setSelectedBrand} />
                            <Select title="Price" options={["Under $50", "$50 - $100", "Over $100"]} value={selectedPrice} onChange={setSelectedPrice} />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>Loading...</div>
                    ) : isError ? (
                        <div className={styles.emptyState}>
                            <p>Something went wrong while loading products.</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>No products found matching this filter.</p>
                        </div>
                    ) : (
                        <div className={styles.catalogWrapper}>
                            <div className={styles.catalogGrid}>
                                {filteredProducts.map((item) => (
                                    <ProductCard
                                        key={item.id}
                                        product={item}
                                        isInCart={cartItems.some((cartItem) => cartItem.id === item.id)}
                                        onAddToCart={handleAddToCart}
                                        onRemoveFromCart={handleRemoveFromCart}
                                    />
                                ))}
                            </div>
                            {hasMore && (
                                <button
                                    className={styles.pagination}
                                    onClick={loadMore}
                                    disabled={isFetching}
                                >
                                    {isFetching ? "Loading..." : "Load more"}
                                </button>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}