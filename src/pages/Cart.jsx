import "./Cart.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const total = cart.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? Number(item.price.replace("$", "").replace("£", ""))
        : Number(item.price);

    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item, index) => (
              <div
                className="cart-item"
                key={`${item.id}-${item.size}-${index}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-info">
                  <h3>{item.name}</h3>

                  <p>
                    <strong>Size:</strong> {item.size}
                  </p>

                  <p>
                    {typeof item.price === "number"
                      ? `$${item.price}`
                      : item.price}
                  </p>

                  <div className="quantity-box">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.id,
                          item.size
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.id,
                          item.size
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h2>Total: ${total.toFixed(2)}</h2>

            <Link to="/checkout">
              <button className="checkout-btn">
                Proceed To Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
