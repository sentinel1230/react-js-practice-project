import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../../features/products/productsApi";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";

import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
    const { id } = useParams()
    const { data: product, isLoading, isError } = useGetProductByIdQuery(id)

    const dispatch = useDispatch();
    const isInCart = useSelector((state) =>
        product ? state.cart.items.some((item) => item.id === product.id) : false
    )

    if (isLoading) {
        return <div className={styles.status}>Loading...</div>
    }

    if (isError || !product) {
        return (
            <div className={styles.status}>
                <p>Product not found.</p>
                <Link to="/products" className={styles.backLink}>Back to catalog</Link>
            </div>
        )
    }

    const handleAddToCart = () => dispatch(addToCart(product))
    const handleRemoveFromCart = () => dispatch(removeFromCart(product.id))

    return (
        <div className={styles.main}>
            <Link to="/products" className={styles.backLink}>Back to catalog</Link>

            <div className={styles.content}>
                <div className={styles.imageWrapper}>
                    <img className={styles.image} src={product.thumbnail} alt={product.title} />
                </div>

                <div className={styles.info}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.brand}>{product.brand || "Unknown brand"}</p>
                    <p className={styles.price}>${product.price.toFixed(2)}</p>
                    <p className={styles.description}>{product.description}</p>
                    <p className={styles.stock}>
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </p>

                    {isInCart ? (
                        <button className={styles.removeBtn} onClick={handleRemoveFromCart}>
                            Remove from cart
                        </button>
                    ) : (
                        <button
                            className={styles.addBtn}
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0}
                        >
                            Add to cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}