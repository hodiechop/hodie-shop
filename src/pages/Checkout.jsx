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
