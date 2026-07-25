import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">
        <p>— NEW COLLECTION</p>

        <h1>
          WEAR YOUR <br />
          <span>STYLE</span>
        </h1>

        <p>
          Discover premium hoodies and t-shirts
          <br />
          with modern designs.
        </p>
      </div>

      <div className="hero-right">
        <Link to="/shop">
          <button className="hero-btn">
            Shop Now
          </button>
        </Link>
      </div>

    </section>
  );
}

export default Hero;