import styles from "./ProductCard.module.css";

export default function ProductCard({ product, isInCart, onAddToCart, onRemoveFromCart }) {
    return (
        <div className={styles.cardContainer}>
            {product ? (
                <div className={styles.productContainer}>
                    <div className={styles.cardImgContainer}>
                        <img
                            className={styles.productImg}
                            src={product.thumbnail}
                            alt={product.title}
                        />
                    </div>

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
