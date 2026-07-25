import "./Categories.css";

function Categories() {
  return (
    <section className="categories">
      <h2>Categories</h2>

      <div className="category-grid">
        <div className="category-card">
          <h3>👕 T-Shirts</h3>
        </div>

        <div className="category-card">
          <h3>🧥 Hoodies</h3>
        </div>

        <div className="category-card">
          <h3>👖 Pants</h3>
        </div>

        <div className="category-card">
          <h3>👟 Shoes</h3>
        </div>
      </div>
    </section>
  );
}

export default Categories;