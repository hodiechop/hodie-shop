import "./Navbar.css";
import logo from "../assets/hodie.png";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import { ThemeContext } from "../context/ThemeContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="HODIE SHOP" />
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* Links */}
      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Right Side */}
      <div className="right-side">
        {/* Wishlist */}
        <div className="icon-box">
          <Link to="/wishlist" className="icon-link">
            ❤️
          </Link>

          {wishlist.length > 0 && (
            <span className="counter">
              {wishlist.length}
            </span>
          )}
        </div>

        {/* Cart */}
        <div className="icon-box">
          <Link to="/cart" className="cart-link">
            🛒
          </Link>

          {cartCount > 0 && (
            <span className="counter">
              {cartCount}
            </span>
          )}
        </div>

        {/* Theme */}
        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* User */}
        <div className="user-box">
          <span className="user-icon">👤</span>

          {username && (
            <span className="username">
              {username}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
