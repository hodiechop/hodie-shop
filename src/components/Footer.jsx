import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h2>HODIE</h2>
          <p>
            Premium Hoodies & T-Shirts for everyday style and comfort.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>📍 SALE, Morocco</p>
          <p>📞 +212 651929691</p>
          <p>📧 17atikiyoussef17@gmail.com</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>

          <p>📘 Facebook : HODIE CHOP </p>
          <p>📷 Instagram :HODIE CHOP
          </p>
          <p>🎵 TikTok :HODIE CHOP </p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 HODIE. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;
