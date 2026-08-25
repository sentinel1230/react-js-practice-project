import { useState, useEffect } from "react";
import styles from "./Products.module.css";

import CategorySelector from "./components/categorySelector/CategorySelector";
import SideBar from "./components/sideBar/SideBar";
import ProductCard from "./components/productCard.jsx/ProductCard";
import Select from "./components/select/Select";

export default function Products() {

    const [topCategory, setTopCategory] = useState("");
    const [sidebarCategory, setsidebarCategory] = useState("");

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://dummyjson.com/products")
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

    const filteredProducts = products.filter((item) => {
        if (!topCategory && !sidebarCategory) return true;

        const itemCat = item.category.toLowerCase();
        const activeTop = topCategory.toLowerCase();
        const activeSide = sidebarCategory.toLowerCase();

        if (activeSide) return itemCat.includes(activeSide) || item.title.toLowerCase().includes(activeSide);
        if (activeTop) return itemCat.includes(activeTop);

        return true;
    });

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
                            <Select title="Size" options={["XS", "S", "M", "L", "XL"]} />
                            <Select title="Brand" options={["Nike", "Adidas", "Puma", "Zara"]} />
                            <Select title="Price" options={["Under $50", "$50 - $100", "Over $100"]} />
                            <Select title="Condition" options={["New", "Used", "Refurbished"]} />
                            <Select title="Shop" options={["Columbia", "Wrangler"]} />
                        </div>
                    </div>

                    <div className={styles.catalogGrid}>
                        {filteredProducts.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}