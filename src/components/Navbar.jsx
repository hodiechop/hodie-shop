import "./Navbar.css";
import logo from "../assets/hodie.png";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Hoodie Shop" />
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
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
        <span className="icon">👤</span>
      </div>
    </nav>
  );
}

export default Navbar;
