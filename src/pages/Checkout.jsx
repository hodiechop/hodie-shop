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

  const total = cart.reduce((sum, item) => {
    const price = Number(String(item.price).replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("السلة فارغة");
      return;
    }

    if (!name || !email || !phone || !address || !city) {
      alert("المرجو ملء جميع الخانات");
      return;
    }

    const products = cart
      .map((item) => {
        const price = Number(String(item.price).replace("$", ""));

        return `
Product : ${item.name}
Size : ${item.size}
Quantity : ${item.quantity}
Price : $${(price * item.quantity).toFixed(2)}
`;
      })
      .join("\n-----------------------\n");

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

      alert("✅ تم إرسال الطلب بنجاح");

      setCart([]);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("❌ وقع خطأ أثناء إرسال الطلب");
    }
  };

  return (
    <div className="checkout">
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
              {cart.map((item, index) => {
                const price = Number(
                  String(item.price).replace("$", "")
                );

                return (
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
                      $
                      {(price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}

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
