import styles from "./Products.module.css";

import CategorySelector from "./components/categorySelector/CategorySelector";
import SideBar from "./components/sideBar/SideBar";

export default function Products() {
    return (
        <div className={styles.main}>
            <div className={styles.topBar}>
                <CategorySelector />
            </div>

            <div className={styles.contentLayout}>
                <div className={styles.sideBar}>
                    <SideBar />
                </div>
                <div className={styles.mainContent}>

                </div>
            </div>
        </div>
    )
}