import "./Products.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

import black from "../assets/products/black-hoodie.png";
import white from "../assets/products/white-hoodie.png";
import red from "../assets/products/red-shirt.jpg";
import grey from "../assets/products/grey-hoodie.png";

const products = [
  {
    id: 1,
    name: "Black Hoodie",
    price: "$17",
    image: black,
  },
  {
    id: 2,
    name: "White Hoodie",
    price: "$17",
    image: white,
  },
  {
    id: 3,
    name: "Red T-Shirt",
    price: "$15",
    image: red,
  },
  {
    id: 4,
    name: "Grey Hoodie",
    price: "$17",
    image: grey,
  },
];

function Products() {
  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  return (
    <section className="products">
      <h2>Our Products</h2>

      <div className="products-grid">
        {products.map((item) => (
          <div className="card" key={item.id}>
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.name} />
            </Link>

            <h3>{item.name}</h3>
            <p>{item.price}</p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <button
                onClick={() => {
                  addToCart(item);
                  alert("✅ Added to Cart");
                }}
              >
                Add To Cart
              </button>

              <button
                className="wishlist-btn"
                onClick={() => {
                  addToWishlist(item);
                  alert("❤️ Added to Wishlist");
                }}
              >
                ❤️ Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
