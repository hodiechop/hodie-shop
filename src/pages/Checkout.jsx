import "./Checkout.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

emailjs.init("OMUHVFYvnbh_avwhv");

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const handleOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!name || !email || !phone || !address || !city) {
      toast.error("Please fill in all fields.");
      return;
    }

    const products = cart
      .map(
        (item) => `
Product : ${item.name}
Size : ${item.size}
Quantity : ${item.quantity}
Price : ${(item.price * item.quantity).toFixed(2)} DH
`
      )
      .join("\n--------------------------\n");

    const templateParams = {
      name,
      email,
      phone,
      address,
      city,
      country: "Morocco",
      products,
      total: `${total.toFixed(2)} DH`,
    };

    try {
      setLoading(true);

      await emailjs.send(
        "service_5znpjvr",
        "template_bd5sxmb",
        templateParams
      );

      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          name,
          email,
          phone,
          address,
          city,
          total,
          cart,
        })
      );

      toast.success("Order Sent Successfully 🎉");

      setCart([]);

      navigate("/success");

    } catch (error) {
      console.error(error);
      toast.error("Failed to send order");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout">

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
            💵 Cash On Delivery
          </div>

          <button
            className="place-order-btn"
            onClick={handleOrder}
            disabled={loading}
          >
            {loading ? "Sending..." : "Place Order"}
          </button>

        </div>

        <div className="order-summary">

          <h2>Order Summary</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  className="summary-item"
                  key={index}
                >
                  <div>
                    <strong>{item.name}</strong>

                    <p>Size: {item.size}</p>

                    <p>Quantity: {item.quantity}</p>
                  </div>

                  <span>
                    {(item.price * item.quantity).toFixed(2)} DH
                  </span>
                </div>
              ))}

              <hr />

              <h3>Total: {total.toFixed(2)} DH</h3>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Checkout;

