import "./Product.css";
import { useParams } from "react-router-dom";
import { useContext } from "react";
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
    description: "Comfortable black hoodie made from premium cotton.",
  },
  {
    id: 2,
    name: "White Hoodie",
    price: "$17",
    image: white,
    description: "Classic white hoodie for everyday style.",
  },
  {
    id: 3,
    name: "Red T-Shirt",
    price: "$15",
    image: red,
    description: "Soft red t-shirt with modern fit.",
  },
  {
    id: 4,
    name: "Grey Hoodie",
    price: "$17",
    image: grey,
    description: "Warm grey hoodie with premium quality.",
  },
];

function Product() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div className="product-details">
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "300px", marginBottom: "20px" }}
      />

      <div className="details">
        <h1>{product.name}</h1>
        <h2>{product.price}</h2>
        <p>{product.description}</p>

        <div className="sizes">
          <h3>Size</h3>
          <button>S</button>
          <button>M</button>
          <button>L</button>
          <button>XL</button>
        </div>

        <div className="quantity">
          <h3>Quantity</h3>
          <input type="number" min="1" defaultValue="1" />
        </div>

        <button
  onClick={() => {
    alert("clicked");

    if (addToCart) {
      addToCart(product);
    } else {
      alert("addToCart is undefined");
    }
  }}
>
  Add To Cart
</button>
      </div>
    </div>
  );
}


export default Product;
