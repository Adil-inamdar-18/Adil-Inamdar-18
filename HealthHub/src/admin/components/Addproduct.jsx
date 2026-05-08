import React, { useState } from "react";
import "./addproduct.css";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    brand: "",
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleclear = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      brand: "",
    });
    setPreview("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formdata.name.trim() ||
      !formdata.price.toString().trim() ||
      !formdata.category.trim() ||
      !formdata.stock.toString().trim() ||
      !formdata.description.trim() ||
      !formdata.brand.trim()
    ) {
      alert("Please fill all the fields");
      return;
    }

    const existingMedicines =
      JSON.parse(localStorage.getItem("medicines")) || [];

    const newMedicine = {
      _id: Date.now().toString(),
      name: formdata.name,
      category: formdata.category,
      price: Number(formdata.price),
      stock: Number(formdata.stock),
      description: formdata.description,
      brand: formdata.brand,
      imageUrl: preview || "https://via.placeholder.com/300x220?text=Medicine",
    };

    const updatedMedicines = [newMedicine, ...existingMedicines];
    localStorage.setItem("medicines", JSON.stringify(updatedMedicines));

    const existingCategories =
      JSON.parse(localStorage.getItem("medicineCategories")) || [];

    if (!existingCategories.includes(formdata.category)) {
      const updatedCategories = [...existingCategories, formdata.category];
      localStorage.setItem(
        "medicineCategories",
        JSON.stringify(updatedCategories)
      );
    }

    alert("Medicine added successfully ✅");
    handleclear();
    navigate("/admindashboard");
  };

  return (
    <div className="add-product-page">
      <div className="add-product-wrapper">
        <header className="ap-header">
          <div className="ap-brand">
            <div className="ap-brand-icon">
              <span className="material-symbols-outlined">medication</span>
            </div>
            <div>
              <h1>Add Medicine</h1>
              <p>Create and manage medicines for your medical store</p>
            </div>
          </div>

          <div className="ap-header-actions">
            <button
              className="ap-nav-btn"
              onClick={() => navigate("/admindashboard")}
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span>Dashboard</span>
            </button>

            <button
              className="ap-nav-btn"
              onClick={() => navigate("/productlist")}
            >
              <span className="material-symbols-outlined">inventory_2</span>
              <span>Medicine List</span>
            </button>
          </div>
        </header>

        <div className="ap-grid">
          <div className="ap-card">
            <div className="ap-card-top">
              <h2>Medicine Information</h2>
              <p>Fill all medicine details carefully.</p>
            </div>

            <form className="ap-form" onSubmit={handleSubmit}>
              <div className="ap-form-group">
                <label>Medicine Name</label>
                <input
                  type="text"
                  name="name"
                  value={formdata.name}
                  onChange={handleChange}
                  placeholder="Enter medicine name"
                />
              </div>

              <div className="ap-form-row">
                <div className="ap-form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formdata.category}
                    onChange={handleChange}
                    placeholder="Example: Tablet, Syrup, Capsule"
                  />
                </div>

                <div className="ap-form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formdata.brand}
                    onChange={handleChange}
                    placeholder="Enter brand name"
                  />
                </div>
              </div>

              <div className="ap-form-row">
                <div className="ap-form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formdata.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                  />
                </div>

                <div className="ap-form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formdata.stock}
                    onChange={handleChange}
                    placeholder="Enter available stock"
                  />
                </div>
              </div>

              <div className="ap-form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formdata.description}
                  onChange={handleChange}
                  placeholder="Write short medicine description"
                  rows="5"
                />
              </div>

              <div className="ap-btn-row">
                <button
                  type="button"
                  className="ap-secondary-btn"
                  onClick={handleclear}
                >
                  Clear Form
                </button>

                <button type="submit" className="ap-primary-btn">
                  <span className="material-symbols-outlined">add_circle</span>
                  Add Medicine
                </button>
              </div>
            </form>
          </div>

          <div className="ap-card ap-side-card">
            <div className="ap-card-top">
              <h2>Medicine Image</h2>
              <p>Upload medicine image to preview instantly.</p>
            </div>

            <label className="ap-upload-box">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="ap-upload-content">
                <span className="material-symbols-outlined ap-upload-icon">
                  upload
                </span>
                <h3>Upload Image</h3>
                <p>Click here to select medicine image</p>
              </div>
            </label>

            <div className="ap-preview-box">
              {preview ? (
                <img src={preview} alt="Preview" className="ap-preview-img" />
              ) : (
                <div className="ap-preview-empty">
                  <span className="material-symbols-outlined">image</span>
                  <p>No image selected</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;