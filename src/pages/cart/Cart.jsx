import styles from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../features/cart/cartSlice";

export default function Cart() {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className={styles.main}>
                <div className={styles.emptyState}>
                    <p>Your product cart is empty</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Корзина</h1>

            <div className={styles.itemsList}>
                {items.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                        <img
                            className={styles.thumb}
                            src={item.thumbnail}
                            alt={item.title}
                        />

                        <div className={styles.info}>
                            <span className={styles.itemTitle}>{item.title}</span>
                            <span className={styles.itemPrice}>{item.price.toFixed(2)} €</span>
                        </div>

                        <span className={styles.lineTotal}>
                            {(item.price * item.quantity).toFixed(2)} €
                        </span>

                        <button
                            className={styles.removeBtn}
                            onClick={() => dispatch(removeFromCart(item.id))}
                            aria-label="Remove item"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.summary}>
                <span className={styles.totalLabel}>
                    Итого: <span className={styles.totalValue}>{totalPrice.toFixed(2)} €</span>
                </span>
                <button className={styles.clearBtn} onClick={() => dispatch(clearCart())}>
                    Очистить корзину
                </button>
            </div>
        </div>
    );
}