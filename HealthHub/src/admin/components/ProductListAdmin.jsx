import React, { useEffect, useMemo, useState } from "react";
import "./productlistadimin.css";
import { useNavigate } from "react-router-dom";

function ProductListAdmin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const FALLBACK_IMAGE =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
        <rect width="100%" height="100%" fill="#f8fafc"/>
        <rect x="20" y="20" width="360" height="260" rx="20" fill="#dbeafe"/>
        <text x="50%" y="45%" text-anchor="middle" font-size="28" font-family="Arial" fill="#1d4ed8">
          Medicine
        </text>
        <text x="50%" y="58%" text-anchor="middle" font-size="16" font-family="Arial" fill="#475569">
          Product Image
        </text>
      </svg>
    `);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("medicines")) || [];
    setProducts(savedProducts);
  }, []);

  const getImageUrl = (item) => {
    const rawUrl = item?.imageUrl || item?.image || "";

    if (!rawUrl || typeof rawUrl !== "string") {
      return FALLBACK_IMAGE;
    }

    const trimmedUrl = rawUrl.trim();

    if (
      trimmedUrl.startsWith("http://") ||
      trimmedUrl.startsWith("https://") ||
      trimmedUrl.startsWith("data:image")
    ) {
      return trimmedUrl;
    }

    if (trimmedUrl.startsWith("/")) {
      return `https://batch-6-backend-production.up.railway.app${trimmedUrl}`;
    }

    return FALLBACK_IMAGE;
  };

  const categories = useMemo(() => {
    const allCategories = products.map((item) => item.category).filter(Boolean);
    return ["All", ...new Set(allCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return products.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(search) ||
        item.category?.toLowerCase().includes(search) ||
        item.brand?.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleDelete = (id) => {
    const updatedProducts = products.filter((item) => item._id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("medicines", JSON.stringify(updatedProducts));
  };

  const getStockStatus = (stock) => {
    const qty = Number(stock) || 0;

    if (qty > 10) {
      return {
        label: "In Stock",
        className: "in",
        width: `${Math.min(qty * 10, 100)}%`,
      };
    }

    if (qty > 0) {
      return {
        label: "Low Stock",
        className: "low",
        width: `${Math.min(qty * 10, 100)}%`,
      };
    }

    return {
      label: "Out of Stock",
      className: "out",
      width: "100%",
    };
  };

  return (
    <div className="pla-container">
      <div className="pla-header">
        <div className="pla-header-left">
          <button
            className="pla-header-icon-btn"
            onClick={() => navigate("/admindashboard")}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          <div className="pla-icon">
            <span className="material-symbols-outlined">inventory_2</span>
          </div>

          <div className="pla-header-text">
            <h1>Medicine List</h1>
            <p>Manage all medicines from your admin panel</p>
          </div>
        </div>

        <div className="pla-header-center">
          <div className="pla-search-box">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder="Search medicine, category, brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="pla-header-right">
          <button
            className="pla-action-btn pla-primary-btn"
            onClick={() => navigate("/addproduct")}
          >
            <span className="material-symbols-outlined">add</span>
            Add Medicine
          </button>
        </div>
      </div>

      <div className="pla-filters">
        <div className="pla-filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="pla-product-list">
        <div className="pla-card-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => {
              const stockInfo = getStockStatus(item.stock);

              return (
                <div className="pla-card" key={item._id}>
                  <div className="pla-card-img">
                    <img
                      src={getImageUrl(item)}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                  </div>

                  <div className="pla-card-body">
                    <h3>{item.name}</h3>
                    <p className="pla-card-category">{item.category}</p>
                    <p className="pla-card-brand">Brand: {item.brand}</p>
                    <p className="pla-card-price">₹{item.price}</p>

                    <div className="pla-card-stock">
                      <div className="pla-stock-top">
                        <span>Stock</span>
                        <span>{item.stock}</span>
                      </div>

                      <div className="pla-product-stock-bar">
                        <div
                          className={`pla-product-stock-fill ${stockInfo.className}`}
                          style={{ width: stockInfo.width }}
                        ></div>
                      </div>

                      <br />

                      <span
                        className={`pla-stock-badge ${stockInfo.className}`}
                      >
                        {stockInfo.label}
                      </span>
                    </div>

                    <p className="pla-card-desc">{item.description}</p>
                  </div>

                  <div className="pla-card-actions">
                    <button
                      onClick={() => navigate(`/updateproduct/${item._id}`)}
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>

                    <button onClick={() => handleDelete(item._id)}>
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="pla-empty-state">
              <span className="material-symbols-outlined">inventory_2</span>
              <h3>No Medicines Found</h3>
              <p>Add medicines from the admin panel to show them here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListAdmin;