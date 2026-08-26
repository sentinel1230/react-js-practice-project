import styles from "./ProductCard.module.css";
import { useState } from "react";

export default function ProductCard({ product }) {
    if (!product) return null;

    const [isFavorite, setIsFavorite] = useState(false)
    const [isAdded, setIsAdded] = useState(false)

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardImgContainer}>
                <img
                    className={styles.productImg}
                    src={product.thumbnail}
                    alt={product.title}
                />

                <button
                    className={`${styles.heartBtn} ${isFavorite ? styles.heartActive : ""}`}
                    onClick={() => setIsFavorite(!isFavorite)}>{ }</button>
            </div>

            <div className={styles.cardInfo}>
                <div className={styles.heading}>
                    <span>{product.title} - {product.brand || 'Unknown brand'}</span>
                </div>

                <div className={styles.costContainer}>
                    <div className={styles.cost}>
                        <span>{product.price.toFixed(2)} €</span>
                    </div>
                    {isAdded ? (
                        <button
                            className={styles.addedBadge}
                            onClick={() => setIsAdded(false)}
                        />
                    ) : (
                        <button
                            className={styles.addToCart}
                            onClick={() => setIsAdded(true)}
                            aria-label="Add to cart"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
