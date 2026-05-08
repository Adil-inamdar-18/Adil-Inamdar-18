import React, { useEffect, useState } from "react";
import "./productdetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../components/context/CartContext";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { addToCart, cartCount } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [favorites, setFavorites] = useState([]);

  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/500x500?text=No+Image";
    return url.startsWith("http")
      ? url
      : `https://batch-6-backend-production.up.railway.app${url}`;
  };

  useEffect(() => {
    const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
    const foundProduct = medicines.find((item) => item._id === id);

    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(getImageUrl(foundProduct.imageUrl));
    }

    const savedFavorites =
      JSON.parse(localStorage.getItem("favirote")) || [];
    setFavorites(savedFavorites);
  }, [id]);

  const isFavorite = (productId) => {
    return favorites.some((item) => item._id === productId);
  };

  const toggleFavorite = (item) => {
    let updatedFavorites;

    if (isFavorite(item._id)) {
      updatedFavorites = favorites.filter((fav) => fav._id !== item._id);
    } else {
      updatedFavorites = [
        ...favorites,
        { ...item, imageUrl: getImageUrl(item.imageUrl) },
      ];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favirote", JSON.stringify(updatedFavorites));
  };

  if (!product) {
    return (
      <div className="pd-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/userhome")}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="pd-page">
      <header className="pd-header">
        <div className="pd-header-left">
          

          <div className="pd-logo-wrap">
            <h1>HealthHub</h1>
            <p>Product Details</p>
          </div>
        </div>

        <div className="pd-search-wrap">
          <span className="material-symbols-outlined pd-search-icon">search</span>
          <input type="text" placeholder="Search medicines..." />
        </div>

        <div className="pd-header-actions">
          <button className="pd-icon-btn" onClick={() => navigate("/userhome")}>
            <span className="material-symbols-outlined">home</span>
          </button>

          <button className="pd-icon-btn pd-badge-btn" onClick={() => navigate("/cart")}>
            <span className="material-symbols-outlined">shopping_bag</span>
            {cartCount > 0 && <span className="pd-count-badge">{cartCount}</span>}
          </button>

          <button
            className="pd-icon-btn pd-badge-btn"
            onClick={() => navigate("/favirote")}
          >
            <span className="material-symbols-outlined">favorite</span>
            {favorites.length > 0 && (
              <span className="pd-count-badge">{favorites.length}</span>
            )}
          </button>
        </div>
      </header>

      <main className="pd-container">
        <section className="pd-gallery-section">
          <div className="pd-image-box">
            <img src={selectedImage} alt={product.name} />

            <button
              className={`pd-fav-btn ${isFavorite(product._id) ? "active" : ""}`}
              onClick={() => toggleFavorite(product)}
            >
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>

          <div className="pd-thumb-row">
            <button
              className={`pd-thumb ${
                selectedImage === getImageUrl(product.imageUrl)
                  ? "pd-thumb-active"
                  : ""
              }`}
              onClick={() => setSelectedImage(getImageUrl(product.imageUrl))}
            >
              <img src={getImageUrl(product.imageUrl)} alt={product.name} />
            </button>
          </div>
        </section>

        <section className="pd-content">
          <div className="pd-top-row">
            <div>
              <p className="pd-brand">{product.brand || "HealthHub"}</p>
              <h2>{product.name}</h2>
            </div>

            <div className="pd-price">
              <p className="pd-price-main">${product.price}</p>
              <p className="pd-price-old">
                ${(Number(product.price) + 5).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="pd-stats">
            <div className="pd-stat-box">
              <strong>4.8</strong>
              <span>Rating</span>
            </div>
            <div className="pd-stat-box">
              <strong>95</strong>
              <span>Reviews</span>
            </div>
            <div className="pd-stat-box">
              <strong>Free</strong>
              <span>Shipping</span>
            </div>
          </div>

          <div className="pd-section">
            <h3>Category</h3>
            <p>{product.category}</p>
          </div>

          <div className="pd-section">
            <h3>Description</h3>
            <p>
              {product.description ||
                `${product.name} is a reliable healthcare product in the ${product.category} category. Carefully selected to support your daily wellness and medical needs.`}
            </p>
          </div>

          <div className="pd-action-row">
            <button className="pd-cart-btn" onClick={() => addToCart(product)}>
              <span className="material-symbols-outlined">shopping_bag</span>
              ADD TO CART
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductDetail;