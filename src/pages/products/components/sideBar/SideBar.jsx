import { useState } from "react";
import styles from "./SideBar.module.css";
import SideBarItem from "./SideBarItem";

export default function SideBar({ activeCat, onChangeCat }) {
    const categories = [
        {
            name: "Apparel",
            slug: "apparel-group",
            items: [
                { name: "Tops", slug: "tops" }
            ]
        },
        {
            name: "Shoes",
            slug: "shoes-group",
            items: [
                { name: "Men's Shoes", slug: "mens-shoes" },
                { name: "Women's Shoes", slug: "womens-shoes" }
            ]
        },
        {
            name: "Accessories",
            slug: "accessories-group",
            items: [
                { name: "Watches", slug: "mens-watches" },
                { name: "Bags", slug: "womens-bags" },
                { name: "Jewellery", slug: "womens-jewellery" },
                { name: "Sunglasses", slug: "sunglasses" }
            ]
        },
        {
            name: "Beauty",
            slug: "beauty-group",
            items: [
                { name: "Cosmetics", slug: "beauty" },
                { name: "Skin Care", slug: "skin-care" },
                { name: "Fragrances", slug: "fragrances" }
            ]
        }
    ];

    const [activePath, setActivePath] = useState([])

    const handleToggle = (node, depth) => {
        if (activePath[depth] === node.name) {
            const newPath = activePath.slice(0, depth);
            setActivePath(newPath);

            if (newPath.length > 0) {
                const parentName = newPath[newPath.length - 1];
                const parentNode = categories.find(c => c.name === parentName);
                onChangeCat(parentNode ? parentNode.slug : "");
            } else {
                onChangeCat("");
            }
        }
        else {
            const newPath = [...activePath.slice(0, depth), node.name];
            setActivePath(newPath);

            if (node.slug) {
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