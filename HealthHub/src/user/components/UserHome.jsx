import React, { useEffect, useState } from "react";
import "./userhome.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/CartContext";

function UserHomeScreen() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart, cartCount } = useCart();

  const [favirote, setfavirote] = useState(() => {
    return JSON.parse(localStorage.getItem("favirote")) || [];
  });

  useEffect(() => {
    const savedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];
    setProduct(savedMedicines);
  }, []);

  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/300x300?text=No+Image";
    return url.startsWith("http") || url.startsWith("data:image")
      ? url
      : `https://batch-6-backend-production.up.railway.app${url}`;
  };

  useEffect(() => {
    localStorage.setItem("favirote", JSON.stringify(favirote));
  }, [favirote]);

  const togglefavirote = (item) => {
    const existingItem = favirote.find((fav) => fav._id === item._id);

    if (existingItem) {
      const updateditems = favirote.filter((fav) => fav._id !== item._id);
      setfavirote(updateditems);
    } else {
      const faviroteitems = {
        ...item,
        imageUrl: getImageUrl(item.imageUrl),
      };
      setfavirote([...favirote, faviroteitems]);
    }
  };

  const isfavirote = (id) => {
    return favirote.some((fav) => fav._id === id);
  };

  const filteredProducts = product.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(search) ||
      item.category?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="uhs-container">
      <header className="uhs-navbar">
        <div className="uhs-navbar-top">
          <div className="uhs-logo-section">
            <div className="uhs-logo-text-wrap">
              <h1 className="uhs-logo-text gradient-text">
                Health<span className="uhs-text-span">Hub</span>
              </h1>
              <p className="uhs-logo-sub">Smart healthcare made simple</p>
            </div>
          </div>

          <div className="uhs-header-search">
            <span className="material-symbols-outlined uhs-header-search-icon">
              search
            </span>
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="uhs-navbar-buttons">
            <button
              className="uhs-btn-icon"
              onClick={() => navigate("/favirote")}
            >
              <span className="material-symbols-outlined">favorite</span>
              {favirote.length > 0 && (
                <span className="uhs-cart-count">{favirote.length}</span>
              )}
            </button>

            <button
              className="uhs-btn-icon uhs-cart-btn"
              onClick={() => navigate("/cart")}
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              <span className="uhs-cart-count">{cartCount}</span>
            </button>

            <button
              className="uhs-btn-icon"
              onClick={() => navigate("/profile")}
            >
              <span className="material-symbols-outlined">person</span>
            </button>
            <button
              className="uhs-btn-icon"
              onClick={() => navigate("/priscription")}
            >
              <span className="material-symbols-outlined">upload_file</span>
              <span>Upload Prescription</span>
            </button>

            <button
              className="uhs-btn-icon"
              onClick={() => navigate("/contact")}
            >
              <span className="material-symbols-outlined">support_agent</span>
            </button>
          </div>
        </div>
      </header>

      <main className="uhs-main">
        <section className="uhs-product-section">
          <div className="uhs-section-header">
            {/* <h3>Available Medicines</h3> */}
            {/* <button
              className="uhs-view-all-btn"
              onClick={() => setSearchTerm("")}
            >
              View All
            </button> */}
          </div>

          <div className="uhs-product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div className="uhs-product-card" key={item._id}>
                  <div className="uhs-product-image">
                    <img
                      src={getImageUrl(item.imageUrl)}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                    />

                    <button
                      className={`uhs-favorite-btn ${
                        isfavirote(item._id) ? "active" : ""
                      }`}
                      onClick={() => togglefavirote(item)}
                    >
                      <span className="material-symbols-outlined">
                        favorite
                      </span>
                    </button>
                  </div>

                  <div className="uhs-product-info">
                    <p className="uhs-category">{item.category}</p>
                    <h4 className="uhs-title">{item.name}</h4>

                    <div className="uhs-price-cart">
                      <span className="uhs-price">${item.price}</span>

                      <button
                        className="uhs-link-btn"
                        onClick={() => navigate(`/productdetail/${item._id}`)}
                      >
                        See more
                      </button>

                      <button
                        className="uhs-cart-btn-small"
                        onClick={() => addToCart(item)}
                      >
                        <span className="material-symbols-outlined">
                          add_shopping_cart
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="uhs-no-products">
                No medicines added yet. Please add medicines from admin panel.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserHomeScreen;
