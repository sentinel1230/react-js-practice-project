import { useState } from "react";
import styles from "./CategorySelector.module.css";

export default function CategorySelector() {
    const categories = ["Women", "Men", "Unisex", "Children", "New", "Old", "Recent", "Least popular", "Most popular"]

    const [activeCat, setActiveCat] = useState(categories[0])

    return (
        <div className={styles.main}>
            {categories.map((category) => (
                <button
                    key={category}
                    className={`${styles.tab} ${activeCat === category ? styles.activeTab : ""}`}
                    onClick={() => setActiveCat(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}