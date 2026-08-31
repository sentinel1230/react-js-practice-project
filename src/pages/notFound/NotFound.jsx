import { Link, useRouteError } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
    const error = useRouteError();

    return (
        <div className={styles.main}>
            <h1 className={styles.code}>404</h1>
            <p className={styles.message}>
                {error?.status === 404
                    ? "Page not found."
                    : "Something went wrong."}
            </p>
            <Link to="/products" className={styles.link}>Back to catalog</Link>
        </div>
    );
}