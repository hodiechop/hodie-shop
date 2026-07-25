import "./Wishlist.css";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="wishlist-page">
      <h1>❤️ My Wishlist</h1>

      {wishlist.length === 0 ? (
        <h2>Your wishlist is empty.</h2>
      ) : (
        <div className="wishlist-list">
          {wishlist.map((item) => (
            <div className="wishlist-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="wishlist-info">
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
