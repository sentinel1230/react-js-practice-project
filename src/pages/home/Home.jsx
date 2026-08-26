import styles from "./Home.module.css"

export default function Home() {
    return (
        <main className={styles.content}>
            <div className={styles.heading}>
                <span> Welcome to home page </span>
            </div>
        </main>
    )
}