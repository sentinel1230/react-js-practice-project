import styles from "./Arrow.module.css";

export default function Arrow({isActive}) {
    return (
        <div className={`${styles.arrow} ${isActive ? styles.active : ""}`}>
            <span></span>
        </div>
    )
}