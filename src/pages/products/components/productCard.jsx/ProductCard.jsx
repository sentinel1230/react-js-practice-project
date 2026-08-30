import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";

export default function ProductCard({ product, isInCart, onAddToCart, onRemoveFromCart }) {
    return (
        <div className={styles.cardContainer}>
            {product ? (
                <div className={styles.productContainer}>
                    <Link to={`/products/${product.id}`} className={styles.cardLink}>
                        <div className={styles.cardImgContainer}>
                            <img
                                className={styles.productImg}
                                src={product.thumbnail}
                                alt={product.title}
                            />
                        </div>
                    </Link>
                    <div className={styles.cardInfo}>
                        <div className={styles.heading}>
                            <span>{product.title} - {product.brand || 'Unknown brand'}</span>
                        </div>

                        <div className={styles.costContainer}>
                            <div className={styles.cost}>
                                <span>{product.price.toFixed(2)} $</span>
                            </div>
                            {isInCart ? (
                                <button
                                    className={styles.addedBadgeBtn}
                                    onClick={() => onRemoveFromCart(product.id)}
                                />
                            ) : (
                                <button
                                    className={styles.addToCartBtn}
                                    onClick={() => onAddToCart(product)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
