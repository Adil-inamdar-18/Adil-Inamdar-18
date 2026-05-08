import React, { useEffect, useState } from "react";
import "./updateproduct.css";
import { useNavigate, useParams } from "react-router-dom";

function Updateproduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [product, setProduct] = useState({
    _id: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    brand: "",
    imageUrl: "",
  });

  useEffect(() => {
    const storedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];

    const selectedMedicine = storedMedicines.find(
      (item) => String(item._id) === String(id),
    );

    if (selectedMedicine) {
      setProduct(selectedMedicine);
      setPreviewImage(selectedMedicine.imageUrl || "");
    } else {
      alert("Medicine not found");
      navigate("/productlist");
    }
  }, [id, navigate]);

  const updateCategoriesFromMedicines = (medicinesList) => {
    const updatedCategories = [
      ...new Set(
        medicinesList
          .map((item) => item.category)
          .filter((category) => category && category.trim() !== ""),
      ),
    ];

    localStorage.setItem(
      "medicineCategories",
      JSON.stringify(updatedCategories),
    );
  };

  const handleUpdate = () => {
    if (
      !product.name?.trim() ||
      !product.price?.toString().trim() ||
      !product.stock?.toString().trim() ||
      !product.category?.trim() ||
      !product.brand?.trim() ||
      !product.description?.trim()
    ) {
      alert("Please fill all the fields");
      return;
    }

    const storedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];

    const updatedMedicines = storedMedicines.map((item) =>
      String(item._id) === String(id)
        ? {
            ...item,
            ...product,
            imageUrl: previewImage || item.imageUrl,
            price: Number(product.price),
            stock: Number(product.stock),
          }
        : item,
    );

    localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
    updateCategoriesFromMedicines(updatedMedicines);

    alert("Medicine updated successfully ✅");
    navigate("/productlist");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setProduct((prev) => ({
        ...prev,
        imageUrl: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const deleteItem = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?",
    );
    if (!confirmDelete) return;

    const storedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];

    const updatedMedicines = storedMedicines.filter(
      (item) => String(item._id) !== String(id),
    );

    localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
    updateCategoriesFromMedicines(updatedMedicines);

    alert("Medicine deleted successfully");
    navigate("/productlist");
  };

  const handleClear = () => {
    setProduct((prev) => ({
      ...prev,
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      brand: "",
      imageUrl: "",
    }));
    setImageFile(null);
    setPreviewImage("");
  };

  return (
    <div className="up-page">
      <header className="up-header">
        <div className="up-header-left">
          <button
            className="up-header-icon-btn"
            onClick={() => navigate("/admindashboard")}
          >
            <span className="material-symbols-outlined">dashboard</span>
          </button>

          <button
            className="up-header-icon-btn"
            onClick={() => navigate("/productlist")}
          >
            <span className="material-symbols-outlined">medication</span>
          </button>

          <div className="up-title-wrap">
            <h2 className="up-title">Update Medicine</h2>
            <p>Edit and manage medicine details</p>
          </div>
        </div>

        <div className="up-header-center">
          <div className="up-search-box">
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="Search medicines..." />
          </div>
        </div>

        <div className="up-header-right">
          <button
            className="up-header-action up-primary-header"
            onClick={() => navigate("/addproduct")}
          >
            <span className="material-symbols-outlined">add</span>
            <span>Add Medicine</span>
          </button>

          <button
            className="up-header-icon-btn"
            onClick={() => navigate("/productlist")}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
      </header>

      <main className="up-container">
        <section className="up-section up-media-card">
          <div className="up-section-head">
            <h3 className="up-section-title">Medicine Image</h3>
          </div>

          <div className="up-image-box">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="up-preview-image"
              />
            ) : (
              <div className="up-no-image">No Image</div>
            )}

            <div className="up-image-overlay">
              <label className="up-edit-btn">
                <span className="material-symbols-outlined">edit</span>
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            </div>
          </div>
        </section>

        <section className="up-section up-form-card">
          <div className="up-section-head">
            <h3 className="up-section-title">Medicine Information</h3>
          </div>

          <div className="up-form">
            <div className="up-field">
              <label>Medicine Name</label>
              <input
                type="text"
                value={product.name || ""}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>

            <div className="up-grid-2">
              <div className="up-field">
                <label>Price</label>
                <div className="up-input-icon">
                  <span>₹</span>
                  <input
                    type="text"
                    value={product.price || ""}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="up-field">
                <label>Stock Units</label>
                <input
                  type="text"
                  value={product.stock || ""}
                  onChange={(e) =>
                    setProduct({ ...product, stock: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="up-grid-2">
              <div className="up-field">
                <label>Category</label>
                <div className="up-select-box">
                  <input
                    type="text"
                    value={product.category || ""}
                    onChange={(e) =>
                      setProduct({ ...product, category: e.target.value })
                    }
                  />
                  <span className="material-symbols-outlined up-arrow">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="up-field">
                <label>Brand</label>
                <input
                  type="text"
                  value={product.brand || ""}
                  onChange={(e) =>
                    setProduct({ ...product, brand: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="up-field">
              <label>Description</label>
              <textarea
                rows="5"
                value={product.description || ""}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </div>

            <div className="up-actions">
              <button className="up-btn up-primary" onClick={handleUpdate}>
                <span className="material-symbols-outlined">save</span>
                Update Medicine
              </button>

              <button className="up-btn up-secondary" onClick={handleClear}>
                <span className="material-symbols-outlined">close</span>
                Clear Form
              </button>

              <button className="up-btn up-danger" onClick={deleteItem}>
                <span className="material-symbols-outlined">delete</span>
                Delete Medicine
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Updateproduct;