import "./Products.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";


import black from "../assets/products/black-hoodie.png";
import white from "../assets/products/white-hoodie.png";
import red from "../assets/products/red-shirt.jpg";
import grey from "../assets/products/grey-hoodie.png";

const products = [
  {
    id: 1,
    name: "Black Hoodie",
    price: 170,
    oldPrice: 220,
    discount: "-23%",
    category: "Hoodie",
    color: "Black",
    images: [
      black,
      black,
      black,
    ],
    isNew: true,
  },

  {
    id: 2,
    name: "White Hoodie",
    price: 170,
    oldPrice: 220,
    discount: "-23%",
    category: "Hoodie",
    color: "White",
    images: [
      white,
      white,
      white,
    ],
    isNew: true,
  },

  {
    id: 3,
    name: "Red T-Shirt",
    price: 150,
    oldPrice: 190,
    discount: "-21%",
    category: "T-Shirt",
    color: "Red",
    images: [
      red,
      red,
      red,
    ],
    isNew: false,
  },

  {
    id: 4,
    name: "Grey Hoodie",
    price: 170,
    oldPrice: 220,
    discount: "-23%",
    category: "Hoodie",
    color: "Grey",
    images: [
      grey,
      grey,
      grey,
    ],
    isNew: false,
  },
];

function Products() {
const { wishlist, addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

const isInWishlist = (id) => {
  return wishlist.some((item) => item.id === id);
};

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [ratings, setRatings] = useState(() => {
    const saved = localStorage.getItem("ratings");

    return saved
      ? JSON.parse(saved)
      : {
          1: 4,
          2: 5,
          3: 4,
          4: 5,
        };
  });

  useEffect(() => {
    localStorage.setItem(
      "ratings",
      JSON.stringify(ratings)
    );
  }, [ratings]);

  const rateProduct = (id, value) => {
    setRatings((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      item.category === category;

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
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Hoodie">Hoodies</option>
          <option value="T-Shirt">T-Shirts</option>
        </select>

      </div>

      <div className="products-grid">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div className="card" key={item.id}>

              <div className="product-image">

                <span className="badge">
                  {item.discount}
                </span>

               <button
  className={
    isInWishlist(item.id)
      ? "heart-btn active-heart"
      : "heart-btn"
  }
  onClick={() => {
    addToWishlist(item);

    if (isInWishlist(item.id)) {
      toast("Removed from Wishlist 💔");
    } else {
      toast.success("Added to Wishlist ❤️");
    }
  }}
>
  {isInWishlist(item.id) ? "❤️" : "🤍"}
</button>


                <Link to={`/product/${item.id}`}>
  <img
    src={item.images[0]}
    alt={item.name}
  />
</Link>

                <Link
                  className="quick-view"
                  to={`/product/${item.id}`}
                >
                  Quick View
                </Link>

              </div>

              <h3>{item.name}</h3>
                            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() =>
                      rateProduct(item.id, star)
                    }
                    className={
                      star <= ratings[item.id]
                        ? "active-star"
                        : ""
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="price-box">

                <span className="old-price">
                  {item.oldPrice} DH
                </span>

                <span className="price">
                  {item.price} DH
                </span>

              </div>

              <button
                className="cart-btn"
                onClick={() => {
                  addToCart({
                    ...item,
                    size: "M",
                    quantity: 1,
                  });

                  toast.success("Added to Cart 🛒", {
                  duration: 2000,
                  style: {
                  background: "#111",
                  color: "#fff",
                  borderRadius: "12px",
                  fontWeight: "600",
  },
});

                }}
              >
                Add To Cart
              </button>

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
