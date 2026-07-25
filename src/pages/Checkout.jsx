import "./Checkout.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import emailjs from "@emailjs/browser";

emailjs.init("OMUHVFYvnbh_avwhv");

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price.replace("$", "")) * item.quantity,
    0
  );

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!name || !email || !phone || !address || !city) {
      alert("Please fill all fields.");
      return;
    }

    const products = cart
      .map(
        (item) =>
          `${item.name} x${item.quantity} = $${(
            Number(item.price.replace("$", "")) * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    const templateParams = {
      name,
      email,
      phone,
      address,
      city,
      country: "Morocco",
      products,
      total: `$${total.toFixed(2)}`,
    };

    try {
      await emailjs.send(
        "service_5znpjvr",
        "template_bd5sxmb",
        templateParams
      );

      alert("✅ Order sent successfully!");

      setCart([]);

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("❌ Failed to send order.");
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Shipping Information</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <h2>Payment Method</h2>

          <div className="payment-box">
            💵 Cash on Delivery
          </div>

          <button
            className="place-order-btn"
            onClick={handleOrder}
          >
            Place Order
          </button>
        </div>

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
