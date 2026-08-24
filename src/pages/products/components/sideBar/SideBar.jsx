import { useState } from "react";
import styles from "./SideBar.module.css";
import SideBarItem from "./SideBarItem";

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

    const [activePath, setActivePath] = useState([])

    const handleToggle = (name, depth) => {
        const newPath = [...activePath]

        if (newPath[depth] === name) {
            setActivePath(newPath.slice(0, depth))
        } else {
            const clearedPath = newPath.slice(0, depth)
            setActivePath([...clearedPath, name])
        }
    }

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
                            onToggle={handleToggle} />
                    </div>
                ))}
            </div>
        </div>
    )
}