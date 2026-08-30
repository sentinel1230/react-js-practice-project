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

                        <div className={styles.quantityControls}>
                            <button
                                className={styles.qtyBtn}
                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                aria-label={`Decrease quantity of ${item.title}`}
                            >
                                −
                            </button>
                            <span className={styles.qtyValue}>{item.quantity}</span>
                            <button
                                className={styles.qtyBtn}
                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                aria-label={`Increase quantity of ${item.title}`}
                            >
                                +
                            </button>
                        </div>

                        <span className={styles.lineTotal}>
                            {(item.price * item.quantity).toFixed(2)} $
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
                    Total: <span className={styles.totalValue}>{totalPrice.toFixed(2)} $</span>
                </span>
                <button className={styles.clearBtn} onClick={() => dispatch(clearCart())}>
                    Clear cart
                </button>
            </div>
        </div>
    );
}