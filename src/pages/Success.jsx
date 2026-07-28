import "./Success.css";
import { Link } from "react-router-dom";

function Success() {
  return (
    <section className="success">

      <div className="success-card">

        <div className="check">
          ✅
        </div>

        <h1>Order Placed Successfully</h1>

        <p>
          Thank you for shopping with HODIE.
          <br />
          Your order has been received.
        </p>

        <Link to="/shop">
          <button>
            Continue Shopping
          </button>
        </Link>

      </div>

    </section>
  );
}

export default Success;