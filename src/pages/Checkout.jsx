import "./Checkout.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price.replace("$", "")) * item.quantity,
    0
  );

  const handleOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("✅ Your order has been placed successfully!");

    // Empty Cart
    setCart([]);

    // Go Home
    navigate("/");
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* Shipping Form */}
        <div className="checkout-form">
          <h2>Shipping Information</h2>

          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number" />
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="City" />
          

          <h2>Payment Method</h2>

          <div className="payment-box">
            💵 Cash on Delivery (Pay when you receive your order)
          </div>

          <button
            className="place-order-btn"
            onClick={handleOrder}
          >
            Place Order
          </button>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="summary-item" key={item.id}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    $
                    {(
                      Number(item.price.replace("$", "")) *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}

              <hr />

              <h3>Total: ${total.toFixed(2)}</h3>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Checkout;
