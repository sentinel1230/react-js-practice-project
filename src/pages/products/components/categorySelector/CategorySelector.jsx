import styles from "./CategorySelector.module.css";

export default function CategorySelector({ activeCat, onChangeCat }) {
    const categories = ["Women", "Men", "Unisex"]

    return (
        <div className={styles.main}>
            {categories.map((category) => (
                <button
                    key={category}
                    className={`${styles.tab} ${activeCat === category ? styles.activeTab : ""}`}
                    onClick={() => onChangeCat(activeCat === category ? "" : category)}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}