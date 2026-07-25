import "./Navbar.css";
import logo from "../assets/hodie.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const username = localStorage.getItem("username");

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
        </li>

        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </li>

        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </li>
      </ul>

      <div className="right-side">

        <input
          type="text"
          placeholder="Search..."
          className="search"
        />

        {/* Wishlist */}
        <div className="cart-icon">
          <Link to="/wishlist" className="icon">
            ❤️
          </Link>

          {wishlist.length > 0 && (
            <span className="cart-count">
              {wishlist.length}
            </span>
          )}
        </div>

        {/* Cart */}
        <div className="cart-icon">
          <Link to="/cart" className="icon">
            🛒
          </Link>

          {cart.length > 0 && (
            <span className="cart-count">
              {cart.length}
            </span>
          )}
        </div>

        {/* User */}
        <div className="user-box">
          <span className="icon">👤</span>

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
