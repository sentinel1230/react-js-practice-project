import { useState } from "react";
import styles from "./SideBar.module.css";

export default function SideBar() {
    const categories = [
        {
            name: "Shoes",
            items: [
                { name: "Leather shoes" }
            ]
        },
        {
            name: "Apparel",
            items: []
        },
        {
            name: "Accessories",
            items: [
                {
                    name: "Belts",
                    items: [
                        { name: "Leather belts" },
                        { name: "Cotton belts" }
                    ]
                },
                {
                    name: "Another accessories",
                    items: [
                        { name: "Another kind of accessory" }
                    ]
                }
            ]
        },
        {
            name: "Sport",
            items: []
        },
        {
            name: "Beauty",
            items: []
        }
    ];

    const [activeCat, setActiveCat] = useState("")
    const [activeSubCat, setActiveSubCat] = useState("")

    const toggle = (categoryName) => {
        setActiveCat(activeCat === categoryName ? "" : categoryName)
        setActiveSubCat("")
    }

    const subToggle = (e, categoryName) => {
        e.stopPropagation();
        setActiveSubCat(activeSubCat === categoryName ? "" : categoryName)
    }

    return (
        <div className={styles.main}>
            <div className={styles.titleWrapper}>
                <span>Categories</span>
            </div>

            <div className={styles.mainContent}>
                {categories.map((category) => (
                    <div className={styles.categoryBlock}>
                        <div
                            key={category.name} className={`${styles.tab} ${activeCat === category.name ? styles.active : ""}`}
                            onClick={() => toggle(category.name)}
                        >
                            <div className={styles.tabWrapper}>
                                <div className={styles.tabTitle}>{category.name}</div>
                                {category.items.length > 0 && (
                                    <div className={styles.arrow}>
                                        <span></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}