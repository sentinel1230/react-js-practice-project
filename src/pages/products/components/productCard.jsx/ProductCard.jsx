import styles from "./ProductCard.module.css";

import { addToCart, removeFromCart } from "../../../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProductCard({ product }) {
    if (!product) return null;

    const dispatch = useDispatch();
    const isAdded = useSelector((state) =>
        state.cart.items.some((item) => item.id === product.id)
    );

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id));
    };

    return (
        <div className={styles.cardContainer}>
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
                    {isAdded ? (
                        <button
                            className={styles.addedBadgeBtn}
                            onClick={handleRemoveFromCart}
                        />
                    ) : (
                        <button
                            className={styles.addToCartBtn}
                            onClick={handleAddToCart}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
