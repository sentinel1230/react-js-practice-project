import { useState } from "react";
import styles from "./SideBar.module.css";
import SideBarItem from "./SideBarItem";

export default function SideBar({ activeCat, onChangeCat }) {
    const categories = [
        {
            name: "Apparel",
            items: [
                { name: "Men's Shirts", slug: "mens-shirts" },
                { name: "Women's Dresses", slug: "womens-dresses" },
                { name: "Tops", slug: "tops" }
            ]
        },
        {
            name: "Shoes",
            items: [
                { name: "Men's Shoes", slug: "mens-shoes" },
                { name: "Women's Shoes", slug: "womens-shoes" }
            ]
        },
        {
            name: "Accessories",
            items: [
                { name: "Watches", slug: "mens-watches" },
                { name: "Bags", slug: "womens-bags" },
                { name: "Jewellery", slug: "womens-jewellery" },
                { name: "Sunglasses", slug: "sunglasses" }
            ]
        },
        {
            name: "Beauty",
            items: [
                { name: "Cosmetics", slug: "beauty" },
                { name: "Skin Care", slug: "skin-care" },
                { name: "Fragrances", slug: "fragrances" }
            ]
        }
    ];

    const [activePath, setActivePath] = useState([])

    const handleToggle = (node, depth) => {
        const hasChildren = node.items && node.items.length > 0

        if (activePath[depth] === node.name) {
            setActivePath(activePath.slice(0, depth));
        } else {
            setActivePath([...activePath.slice(0, depth), node.name])
            if (!hasChildren) {
                onChangeCat(node.slug)
            }
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.titleWrapper}>
                <span>Categories</span>
            </div>

            <div className={styles.mainContent}>
                {categories.map((category) => (
                    <div key={category.name} className={styles.categoryBlock}>
                        <SideBarItem
                            node={category}
                            activePath={activePath}
                            onToggle={handleToggle}
                            globalActiveCat={activeCat}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}