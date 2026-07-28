import "./ProductDetails.css";
import { useParams, Link } from "react-router-dom";
import { useState, useContext } from "react";
import toast from "react-hot-toast";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

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
    images: [black, black, black],
    description:
      "Premium cotton hoodie with soft fleece inside. Perfect for everyday wear.",
  },

  {
    id: 2,
    name: "White Hoodie",
    price: 170,
    oldPrice: 220,
    images: [white, white, white],
    description:
      "Comfortable oversized hoodie made from premium cotton.",
  },

  {
    id: 3,
    name: "Red T-Shirt",
    price: 150,
    oldPrice: 190,
    images: [red, red, red],
    description:
      "Soft premium T-shirt with modern fit.",
  },

  {
    id: 4,
    name: "Grey Hoodie",
    price: 170,
    oldPrice: 220,
    images: [grey, grey, grey],
    description:
      "Classic grey hoodie with minimalist style.",
  },
];

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist } =
    useContext(WishlistContext);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  const [mainImage, setMainImage] = useState(
    product.images[0]
  );

  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

 const isFav = wishlist.some(
  (item) => item.id === product.id
);

return (
  <section className="details">

          <div className="details-image">

        <img
          src={mainImage}
          alt={product.name}
        />

        <div className="gallery">

          {product.images.map((img, index) => (

            <img
              key={index}
              src={img}
              alt={product.name}
              onClick={() => setMainImage(img)}
            />

          ))}

        </div>

      </div>

      <div className="details-info">

        <h1>{product.name}</h1>

        <div className="price-box">

          <span className="old-price">
            {product.oldPrice} DH
          </span>

          <span className="price">
            {product.price} DH
          </span>

        </div>

        <p>{product.description}</p>

        <h3>Select Size</h3>

        <div className="sizes">

          <button onClick={() => setSize("S")}>S</button>

          <button onClick={() => setSize("M")}>M</button>

          <button onClick={() => setSize("L")}>L</button>

          <button onClick={() => setSize("XL")}>XL</button>

        </div>

        <h3>Quantity</h3>

        <div className="quantity">

          <button
            onClick={() =>
              setQty(Math.max(1, qty - 1))
            }
          >
            -
          </button>

          <span>{qty}</span>

          <button
            onClick={() => setQty(qty + 1)}
          >
            +
          </button>

        </div>

        <button
          className="buy-btn"
          onClick={() => {

            addToCart({
              ...product,
              image: mainImage,
              size,
              quantity: qty,
            });

            toast.success("Added to Cart 🛒", {
              duration: 2000,
              style: {
                background: "#111",
                color: "#fff",
                borderRadius: "12px",
              },
            });

          }}
        >
          Add To Cart
        </button>

        <button
          className="wishlist-btn"
          onClick={() => {

            addToWishlist(product);

            if (isFav) {
              toast("Already in Wishlist ❤️");
            } else {
              toast.success("Added to Wishlist ❤️");
            }

          }}
        >
          {isFav
            ? "❤️ In Wishlist"
            : "🤍 Add To Wishlist"}
        </button>

      </div>

            <div className="related">

        <h2>You May Also Like</h2>

        <div className="related-grid">

          {products
            .filter((item) => item.id !== product.id)
            .map((item) => (

              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="related-card"
              >

                <img
                  src={item.images[0]}
                  alt={item.name}
                />

                <h4>{item.name}</h4>

                <span>{item.price} DH</span>

              </Link>

            ))}

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;
