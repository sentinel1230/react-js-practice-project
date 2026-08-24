import { useState } from "react";
import styles from "./SideBar.module.css";

import Arrow from "../arrow/Arrow";

export default function SideBarItem({ node, depth = 0, activePath, onToggle}) {
    const isOpen = activePath[depth] === node.name

    const hasChildren = node.items && node.items.length > 0

    const handleClick = (e) => {
        e.stopPropagation()
        onToggle(node.name, depth)
    }

    let tabClass = styles.tab
    if (depth === 1) tabClass = styles.subTab
    if (depth > 1) tabClass = styles.nestTab

    return (
        <div className={styles.itemBlock}>
            <div className={`${tabClass} ${isOpen ? styles.active : ""}`} onClick={handleClick}>
                <div className={styles.tabWrapper}>
                    {node.name}
                    {hasChildren && <Arrow isActive={isOpen} />}
                </div>
            </div>

            {isOpen && hasChildren && (
                <div className={styles.subMenu} styles={{ paddingLeft: "16px" }}>
                    {node.items.map((childNode) => (
                        <SideBarItem
                            key={childNode.name}
                            node={childNode}
                            depth={depth + 1}
                            activePath={activePath}
                            onToggle={onToggle} />
                    ))}
                </div>
            )}
        </div>
    )
}