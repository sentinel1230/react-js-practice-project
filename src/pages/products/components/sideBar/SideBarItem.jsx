import styles from "./SideBar.module.css";
import Arrow from "../arrow/Arrow";

export default function SideBarItem({ node, depth = 0, activePath, onToggle, globalActiveCat }) {
    const isOpen = activePath[depth] === node.name
    const hasChildren = node.items && node.items.length > 0

    const isCurrentActiveProduct = globalActiveCat === node.slug;

    const handleClick = (e) => {
        e.stopPropagation()
        onToggle(node, depth)
    }

    let tabClass = styles.tab
    if (depth === 1) tabClass = styles.subTab
    if (depth > 1) tabClass = styles.nestTab

    return (
        <div>
            <button
                type="button"
                className={`${tabClass} ${isOpen || isCurrentActiveProduct ? styles.active : ""}`}
                onClick={handleClick}
                aria-expanded={hasChildren ? isOpen : undefined}
            >
                <span className={styles.tabWrapper}>
                    {node.name}
                    {hasChildren && <Arrow isActive={isOpen} />}
                </span>
            </button>

            {isOpen && hasChildren && (
                <div className={styles.subMenu}>
                    {node.items.map((childNode) => (
                        <SideBarItem
                            key={childNode.name}
                            node={childNode}
                            depth={depth + 1}
                            activePath={activePath}
                            onToggle={onToggle}
                            globalActiveCat={globalActiveCat}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}