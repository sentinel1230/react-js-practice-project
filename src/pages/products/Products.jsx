import { useState, useEffect, useMemo } from "react";
import styles from "./Products.module.css";

import CategorySelector from "./components/categorySelector/CategorySelector";
import SideBar from "./components/sideBar/SideBar";
import ProductCard from "./components/productCard.jsx/ProductCard";
import Select from "./components/select/Select";

export default function Products() {
    const CATEGORY_MAP = {
        "women": ["womens-dresses", "womens-shoes", "womens-bags", "womens-jewellery", "womens-watches"],
        "men": ["mens-shirts", "mens-shoes", "mens-watches"],
        "unisex": ["sunglasses", "skin-care", "fragrances"],
    };

    const SIDEBAR_GROUPS = {
        "apparel-group": ["mens-shirts", "womens-dresses", "tops"],
        "shoes-group": ["mens-shoes", "womens-shoes"],
        "accessories-group": ["mens-watches", "womens-bags", "womens-jewellery", "sunglasses"],
        "beauty-group": ["beauty", "skin-care", "fragrances"],
    };

    const [topCategory, setTopCategory] = useState("");
    const [sidebarCategory, setsidebarCategory] = useState("");

    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");

    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(30);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://dummyjson.com/products?limit=0`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Ошибка загрузки PRODUCTS", err);
                setIsLoading(false);
            });
    }, []);

    const availableBrands = useMemo(() => {
        const set = new Set(
            products.map((p) => p.brand).filter(Boolean)
        );
        return Array.from(set).sort();
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((item) => {
            const itemCat = item.category?.toLowerCase() || "";
            const itemBrand = item.brand?.toLowerCase() || "";
            const itemPrice = item.price || 0;

            if (topCategory) {
                const validTopCats = CATEGORY_MAP[topCategory.toLowerCase()] || [];
                if (validTopCats.length === 0) return false;
                if (!validTopCats.includes(itemCat)) return false;
            }

            if (sidebarCategory) {
                if (sidebarCategory.endsWith("-group")) {
                    const groupCats = SIDEBAR_GROUPS[sidebarCategory] || [];
                    if (!groupCats.includes(itemCat)) return false;
                } else {
                    if (itemCat !== sidebarCategory) return false;
                }
            }

            if (selectedBrand && itemBrand !== selectedBrand.toLowerCase()) return false;

            if (selectedPrice) {
                if (selectedPrice === "Under $50" && itemPrice >= 50) return false;
                if (selectedPrice === "$50 - $100" && (itemPrice < 50 || itemPrice > 100)) return false;
                if (selectedPrice === "Over $100" && itemPrice <= 100) return false;
            }

            return true;
        });
    }, [products, topCategory, sidebarCategory, selectedBrand, selectedPrice]);

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    return (
        <div className={styles.main}>
            <div className={styles.topBar}>
                <CategorySelector activeCat={topCategory} onChangeCat={setTopCategory} />
            </div>

            <div className={styles.contentLayout}>
                <div className={styles.sideBar}>
                    <SideBar activeCat={sidebarCategory} onChangeCat={setsidebarCategory} />
                </div>

                <main className={styles.catalogContainer}>
                    <nav className={styles.breadcrumbs}>
                        <span>Products</span>
                        <span>{topCategory}</span>
                        <span>{sidebarCategory}</span>
                    </nav>
                    <div className={styles.filterToolbar}>
                        <div className={styles.dropdownsGroup}>
                            <Select
                                title="Brand"
                                options={availableBrands}
                                value={selectedBrand}
                                onChange={setSelectedBrand} />
                            <Select
                                title="Price"
                                options={["Under $50", "$50 - $100", "Over $100"]}
                                value={selectedPrice}
                                onChange={setSelectedPrice} />
                        </div>
                    </div>

                    {isLoading ? (
                        <div>Loading...</div>
                    ) : filteredProducts.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>No products found matching this filter.</p>
                            <p>Please, try another category.</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.catalogGrid}>
                                {visibleProducts.map((item) => (
                                    <ProductCard key={item.id} product={item} />
                                ))}
                            </div>

                            {visibleCount < filteredProducts.length && (
                                <div
                                    className={styles.pagination}
                                    onClick={() => setVisibleCount((v) => v + 30)}
                                >
                                    Load more
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    )
}