import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

import logo from "../../assets/logo.svg";

import heartIcon from "../../assets/heart.svg";
import cartIcon from "../../assets/cart.svg";
import userIcon from "../../assets/user.svg";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={styles.main}>
            <div className={styles.logoInputWrapper}>
                <div className={styles.logoWrapper}>
                    <img className={styles.logo} src={logo} alt="Logo" />
                    <p className={styles.logoText}>
                        <span>2nd</span>
                        <span>hand</span>
                        <span>market</span>
                    </p>
                </div>

                <div className={styles.searchWrapper}>
                    <input className={styles.searchInput} type="text" />
                </div>
            </div>

            <div className={`${styles.navbarIconWrapper} ${isOpen ? styles.menuOpen : ""}`}>
                <nav className={styles.navbar}>
                    <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
                    <NavLink to="/products" onClick={() => setIsOpen(false)}>Products</NavLink>
                    <NavLink to="/cart" onClick={() => setIsOpen(false)}>Cart</NavLink>
                </nav>

                <div className={styles.iconWrapper}>
                    <img className={styles.heartIcon} src={heartIcon} alt="Heart" />
                    <img className={styles.cartIcon} src={cartIcon} alt="Cart" />
                    <img className={styles.userIcon} src={userIcon} alt="User" />
                </div>
            </div>

            <button className={`${styles.burger} ${isOpen ? styles.burgerActive : ""}`} onClick={toggle}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    )
}