import React, { useMemo, useState } from "react";
import "./prescriptionuploader.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/CartContext";

function PrescriptionUploader() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [previewImage, setPreviewImage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/300x300?text=No+Image";

    return url.startsWith("http") || url.startsWith("data:image")
      ? url
      : `https://batch-6-backend-production.up.railway.app${url}`;
  };

  const formatINR = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(price) || 0);
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

    return Array.isArray(savedMedicines) ? savedMedicines.slice(0, 8) : [];
  }, [previewImage]);

  return (
    <main className="pu-page">
      <div className="pu-page-header">
        <div>
          <h1>Prescription Upload</h1>
          <p>Upload your prescription and quickly add matched medicines</p>
        </div>

        <button className="pu-back-btn" onClick={() => navigate("/userhome")}>
          <span className="material-symbols-outlined">storefront</span>
          Back to Store
        </button>
      </div>

      <section className="pu-layout">
        <div className="pu-left">
          <div className="pu-card">
            <div className="pu-card-title">
              <h2>Upload Prescription</h2>
              <p>Choose an image from your device</p>
            </div>

            <div className={`pu-upload-box ${previewImage ? "has-preview" : ""}`}>
              <label className="pu-upload-label">
                <input type="file" accept="image/*" onChange={handleImageUpload} />

                <span className="material-symbols-outlined">upload_file</span>

                <strong>Choose Prescription Image</strong>
                <small>PNG, JPG or JPEG supported</small>
              </label>

              {previewImage && (
                <div className="pu-preview-section">
                  <div className="pu-small-preview">
                    <img src={previewImage} alt="Prescription Preview" />
                  </div>

                  <div className="pu-preview-actions">
                    <button
                      className="pu-preview-btn"
                      onClick={() => setShowModal(true)}
                    >
                      <span className="material-symbols-outlined">visibility</span>
                      See Prescription
                    </button>

                    <button
                      className="pu-remove-btn"
                      onClick={() => {
                        setPreviewImage("");
                        setShowModal(false);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="pu-info-box">
              <span className="material-symbols-outlined">info</span>
              <p>
                Upload a clear prescription image. Matched medicines will appear
                on the right side after upload.
              </p>
            </div>
          </div>
        </div>

        <aside className="pu-right">
          <div className="pu-card">
            <div className="pu-card-title">
              <h2>Matched Medicines</h2>
              <p>
                {previewImage
                  ? `${matchedProducts.length} medicines found`
                  : "Upload prescription to view medicines"}
              </p>
            </div>

            {previewImage && matchedProducts.length > 0 ? (
              <div className="pu-product-grid">
                {matchedProducts.map((item, index) => (
                  <div className="pu-product-card" key={item._id || item.id || index}>
                    <div className="pu-product-img-wrap">
                      <img
                        src={getImageUrl(item.imageUrl || item.image)}
                        alt={item.name || "Medicine"}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x300?text=No+Image";
                        }}
                      />
                    </div>

                    <div className="pu-product-info">
                      <p>{item.category || item.brand || "Medicine"}</p>
                      <h3>{item.name || "Medicine"}</h3>

                      <div className="pu-product-bottom">
                        <strong>{formatINR(item.price)}</strong>

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
                  </div>
                ))}
              </div>
            ) : (
              <div className="pu-empty">
                <span className="material-symbols-outlined">medication</span>
                <h3>No matched medicines yet</h3>
                <p>Upload prescription image to view medicine cards.</p>
              </div>
            )}
          </div>
        </aside>
      </section>

      {showModal && (
        <div className="pu-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pu-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="pu-modal-close" onClick={() => setShowModal(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3>Prescription Preview</h3>

            <div className="pu-modal-image-wrap">
              <img src={previewImage} alt="Full Prescription" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default PrescriptionUploader;