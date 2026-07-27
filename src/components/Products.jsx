import "./Products.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
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
    price: 17,
    category: "Hoodie",
    color: "Black",
    image: black,
  },
  {
    id: 2,
    name: "White Hoodie",
    price: 17,
    category: "Hoodie",
    color: "White",
    image: white,
  },
  {
    id: 3,
    name: "Red T-Shirt",
    price: 15,
    category: "T-Shirt",
    color: "Red",
    image: red,
  },
  {
    id: 4,
    name: "Grey Hoodie",
    price: 17,
    category: "Hoodie",
    color: "Grey",
    image: grey,
  },
];

function Products() {
  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

 const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((item) => {
  const matchSearch = item.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchCategory =
    category === "All" || item.category === category;

  return matchSearch && matchCategory;
});

  return (
    <section className="products">

      <h2>Our Products</h2>

      <div className="products-search">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="All">All Categories</option>
  <option value="Hoodie">Hoodies</option>
  <option value="T-Shirt">T-Shirts</option>
</select>
      </div>

      <div className="products-grid">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
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
                    addToCart({
                      ...item,
                      size: "M",
                      quantity: 1,
                    });

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
          ))
        ) : (
          <h2 className="no-products">
            No products found 😢
          </h2>
        )}

      </div>

    </section>
  );
}

export default Products;
