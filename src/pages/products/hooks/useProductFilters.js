import { useState, useMemo } from "react";

const PRICE_RANGES = {
    "Under $50": (p) => p < 50,
    "$50 - $100": (p) => p >= 50 && p <= 100,
    "Over $100": (p) => p > 100,
};

export function useProductFilters(products) {
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");

    const availableBrands = useMemo(() => {
        const set = new Set(products.map((p) => p.brand).filter(Boolean));
        return Array.from(set).sort();
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((item) => {
            const itemBrand = item.brand?.toLowerCase() || "";
            const itemPrice = item.price || 0;

            if (selectedBrand && itemBrand !== selectedBrand.toLowerCase()) return false;

            if (selectedPrice) {
                const matchesPrice = PRICE_RANGES[selectedPrice]?.(itemPrice);
                if (!matchesPrice) return false;
            }

            return true;
        });
    }, [products, selectedBrand, selectedPrice]);

    return {
        selectedBrand, setSelectedBrand,
        selectedPrice, setSelectedPrice,
        availableBrands,
        filteredProducts,
    };
}