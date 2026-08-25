import { useState } from "react";
import styles from "./SideBar.module.css";
import SideBarItem from "./SideBarItem";

export default function SideBar({ activeCat, onChangeCat }) {
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
        if (activePath[depth] === name) {
            const newPath = activePath.slice(0, depth);
            setActivePath(newPath);

            if (newPath.length > 0) {
                onChangeCat(newPath[newPath.length - 1]);
            } else {
                onChangeCat("");
            }
        }
        else {
            const newPath = [...activePath.slice(0, depth), name];
            setActivePath(newPath);
            onChangeCat(name);
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