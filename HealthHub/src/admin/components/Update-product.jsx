import React, { useEffect, useState } from "react";
import "./updateproduct.css";
import { useNavigate, useParams } from "react-router-dom";

function Updateproduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});
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
      (item) => String(item._id) === String(id)
    );

    if (selectedMedicine) {
      setProduct(selectedMedicine);
      setPreviewImage(selectedMedicine.imageUrl || selectedMedicine.image || "");
    } else {
      navigate("/productlist");
    }
  }, [id, navigate]);

  const handleInputChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const updateCategoriesFromMedicines = (medicinesList) => {
    const updatedCategories = [
      ...new Set(
        medicinesList
          .map((item) => item.category)
          .filter((category) => category && category.trim() !== "")
      ),
    ];

    localStorage.setItem("medicineCategories", JSON.stringify(updatedCategories));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!product.name?.trim()) newErrors.name = "Medicine name is required";
    if (!product.price?.toString().trim()) newErrors.price = "Price is required";
    if (!product.stock?.toString().trim()) newErrors.stock = "Stock is required";
    if (!product.category?.trim()) newErrors.category = "Category is required";
    if (!product.brand?.trim()) newErrors.brand = "Brand is required";
    if (!product.description?.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (!validateForm()) return;

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
        : item
    );

    localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
    updateCategoriesFromMedicines(updatedMedicines);

    navigate("/productlist");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

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
    const storedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];

    const updatedMedicines = storedMedicines.filter(
      (item) => String(item._id) !== String(id)
    );

    localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
    updateCategoriesFromMedicines(updatedMedicines);

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

    setPreviewImage("");
    setErrors({});
  };

  return (
    <main className="up-page">
      <section className="up-header">
        <div className="up-header-left">
          <div className="up-header-icon">
            <span className="material-symbols-outlined">edit_square</span>
          </div>

          <div>
            <h1>Update Medicine</h1>
            <p>Edit medicine details, stock, price and product image</p>
          </div>
        </div>

        <div className="up-header-actions">
          <button
            className="up-nav-btn"
            onClick={() => navigate("/productlist")}
          >
            <span className="material-symbols-outlined">inventory_2</span>
            Medicine List
          </button>

          <button
            className="up-nav-btn primary"
            onClick={() => navigate("/addproduct")}
          >
            <span className="material-symbols-outlined">add</span>
            Add Medicine
          </button>
        </div>
      </section>

      <section className="up-layout">
        <aside className="up-media-card">
          <div className="up-card-title">
            <h2>Medicine Image</h2>
            <p>Preview and update medicine image</p>
          </div>

          <div className="up-image-box">
            {previewImage ? (
              <img src={previewImage} alt="Preview" />
            ) : (
              <div className="up-no-image">
                <span className="material-symbols-outlined">image</span>
                <p>No image selected</p>
              </div>
            )}
          </div>

          <label className="up-upload-btn">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <span className="material-symbols-outlined">photo_camera</span>
            Change Image
          </label>
        </aside>

        <section className="up-form-card">
          <div className="up-card-title">
            <h2>Medicine Information</h2>
            <p>Update all required medicine information</p>
          </div>

          <div className="up-form">
            <div className="up-field">
              <label>Medicine Name</label>
              <input
                type="text"
                value={product.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter medicine name"
                className={errors.name ? "up-input-error" : ""}
              />
              {errors.name && <span>{errors.name}</span>}
            </div>

            <div className="up-grid-2">
              <div className="up-field">
                <label>Price</label>
                <div
                  className={`up-input-icon ${
                    errors.price ? "up-input-error" : ""
                  }`}
                >
                  <span>₹</span>
                  <input
                    type="number"
                    value={product.price || ""}
                    onChange={(e) =>
                      handleInputChange("price", e.target.value)
                    }
                    placeholder="Enter price"
                  />
                </div>
                {errors.price && <span>{errors.price}</span>}
              </div>

              <div className="up-field">
                <label>Stock Units</label>
                <input
                  type="number"
                  value={product.stock || ""}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  placeholder="Enter stock"
                  className={errors.stock ? "up-input-error" : ""}
                />
                {errors.stock && <span>{errors.stock}</span>}
              </div>
            </div>

            <div className="up-grid-2">
              <div className="up-field">
                <label>Category</label>
                <input
                  type="text"
                  value={product.category || ""}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  placeholder="Tablet, Syrup, Capsule"
                  className={errors.category ? "up-input-error" : ""}
                />
                {errors.category && <span>{errors.category}</span>}
              </div>

              <div className="up-field">
                <label>Brand</label>
                <input
                  type="text"
                  value={product.brand || ""}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  placeholder="Enter brand name"
                  className={errors.brand ? "up-input-error" : ""}
                />
                {errors.brand && <span>{errors.brand}</span>}
              </div>
            </div>

            <div className="up-field">
              <label>Description</label>
              <textarea
                rows="5"
                value={product.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Write medicine description"
                className={errors.description ? "up-input-error" : ""}
              />
              {errors.description && <span>{errors.description}</span>}
            </div>

            <div className="up-actions">
              <button className="up-btn up-primary" onClick={handleUpdate}>
                <span className="material-symbols-outlined">save</span>
                Update Medicine
              </button>

              <button className="up-btn up-secondary" onClick={handleClear}>
                <span className="material-symbols-outlined">restart_alt</span>
                Clear Form
              </button>

              <button className="up-btn up-danger" onClick={deleteItem}>
                <span className="material-symbols-outlined">delete</span>
                Delete Medicine
              </button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Updateproduct;