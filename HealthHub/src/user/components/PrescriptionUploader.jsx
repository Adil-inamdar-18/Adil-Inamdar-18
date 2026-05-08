import React, { useMemo, useState } from "react";
import "./prescriptionuploader.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/CartContext";

function PrescriptionUploader() {
  const navigate = useNavigate();
  const { addToCart, cartCount } = useCart();

  const [previewImage, setPreviewImage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/300x300?text=No+Image";
    return url.startsWith("http") || url.startsWith("data:image")
      ? url
      : `https://batch-6-backend-production.up.railway.app${url}`;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    setShowModal(false);
  };

  const matchedProducts = useMemo(() => {
    const savedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];
    if (!previewImage) return [];
    return savedMedicines.slice(0, 8);
  }, [previewImage]);

  return (
    <div className="pu-page">
      <header className="pu-header">
        <div className="pu-header-left">
          {/* <button className="pu-icon-btn" onClick={() => navigate("/userhome")}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button> */}

          <div className="pu-title-wrap">
            <h1>Prescription Uploader</h1>
            <p>Upload and preview matched medicines</p>
          </div>
        </div>

        <div className="pu-header-actions">
          <button className="pu-icon-btn" onClick={() => navigate("/userhome")}>
            <span className="material-symbols-outlined">home</span>
          </button>

          <button
            className="pu-icon-btn pu-cart-header-btn"
            onClick={() => navigate("/cart")}
          >
            <span className="material-symbols-outlined">shopping_cart</span>

            {cartCount > 0 && (
              <span className="pu-cart-count">{cartCount}</span>
            )}
          </button>

          <button className="pu-icon-btn" onClick={() => navigate("/profile")}>
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </header>

      <div className="pu-container">
        <div className="pu-card">
          <h2>Upload Prescription</h2>
          <p className="pu-subtitle">
            Upload prescription image and preview matched medicine cards
          </p>

          <div className="pu-upload-box">
            <label className="pu-upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <span className="material-symbols-outlined">upload_file</span>
              <span>Choose Prescription Image</span>
            </label>

            {previewImage && (
              <div className="pu-preview-section">
                <div className="pu-small-preview">
                  <img
                    src={previewImage}
                    alt="Prescription Preview"
                    className="pu-small-preview-img"
                  />
                </div>

                <button
                  className="pu-preview-btn"
                  onClick={() => setShowModal(true)}
                >
                  See Prescription
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="pu-card">
          <h2>Matched Medicines</h2>
          <p className="pu-subtitle">Matched medicines in card grid</p>

          {previewImage && matchedProducts.length > 0 ? (
            <div className="pu-product-grid">
              {matchedProducts.map((item, index) => (
                <div
                  className="pu-product-card"
                  key={item._id || item.id || index}
                >
                  <div className="pu-product-img-wrap">
                    <img
                      src={getImageUrl(item.imageUrl || item.image)}
                      alt={item.name}
                      className="pu-product-img"
                    />
                  </div>

                  <div className="pu-product-info">
                    <h3>{item.name}</h3>

                    <button
                      className="pu-cart-icon-btn"
                      onClick={() => addToCart(item)}
                    >
                      <span className="material-symbols-outlined">
                        add_shopping_cart
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pu-empty">
              <h3>No matched medicines yet</h3>
              <p>Upload prescription image to view matched medicine cards.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="pu-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pu-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="pu-modal-close"
              onClick={() => setShowModal(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3>Prescription Preview</h3>

            <div className="pu-modal-image-wrap">
              <img
                src={previewImage}
                alt="Full Prescription"
                className="pu-modal-img"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrescriptionUploader;
