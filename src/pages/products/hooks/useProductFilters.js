import { useState, useMemo } from "react";

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

const PRICE_RANGES = {
    "Under $50": (p) => p < 50,
    "$50 - $100": (p) => p >= 50 && p <= 100,
    "Over $100": (p) => p > 100,
};

export function useProductFilters(products) {
    const [topCategory, setTopCategory] = useState("");
    const [sidebarCategory, setSidebarCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");

    const availableBrands = useMemo(() => {
        const set = new Set(products.map((p) => p.brand).filter(Boolean));
        return Array.from(set).sort().slice(0, 15);
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((item) => {
            const itemCat = item.category?.toLowerCase() || "";
            const itemBrand = item.brand?.toLowerCase() || "";
            const itemPrice = item.price || 0;

            if (topCategory) {
                const validTopCats = CATEGORY_MAP[topCategory.toLowerCase()] || [];
                if (!validTopCats.includes(itemCat)) return false;
            }

            if (sidebarCategory) {
                if (sidebarCategory.endsWith("-group")) {
                    const groupCats = SIDEBAR_GROUPS[sidebarCategory] || [];
                    if (!groupCats.includes(itemCat)) return false;
                } else if (itemCat !== sidebarCategory) {
                    return false;
                }
            }

            if (selectedBrand && itemBrand !== selectedBrand.toLowerCase()) return false;

            if (selectedPrice) {
                const matchesPrice = PRICE_RANGES[selectedPrice]?.(itemPrice);
                if (!matchesPrice) return false;
            }

            return true;
        });
    }, [products, topCategory, sidebarCategory, selectedBrand, selectedPrice]);

    return {
        topCategory, setTopCategory,
        sidebarCategory, setSidebarCategory,
        selectedBrand, setSelectedBrand,
        selectedPrice, setSelectedPrice,
        availableBrands,
        filteredProducts,
    };
}