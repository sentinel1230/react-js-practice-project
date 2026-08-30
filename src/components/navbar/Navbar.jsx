import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

import logo from "../../assets/logo.svg";
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
            </div>

            <div className={`${styles.navbarIconWrapper} ${isOpen ? styles.menuOpen : ""}`}>
                <nav className={styles.navbar}>
                    <NavLink to="/products" onClick={() => setIsOpen(false)}>Products</NavLink>
                    <NavLink to="/cart" onClick={() => setIsOpen(false)}>Cart</NavLink>
                </nav>
            </div>

            <button className={`${styles.burger} ${isOpen ? styles.burgerActive : ""}`} onClick={toggle}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    )
}