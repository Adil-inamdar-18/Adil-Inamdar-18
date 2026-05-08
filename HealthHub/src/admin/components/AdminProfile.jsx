import React, { useState } from "react";
import "./adminprofile.css";
import { useNavigate } from "react-router-dom";

function AdminProfile() {
  const navigate = useNavigate();

  const defaultAdmin = {
    name: "HealthHub Admin",
    email: "admin@healthhub.com",
    phone: "+91 9876543210",
    role: "Admin",
    address: "Nashik, Maharashtra, India",
    joined: "2026",
    image: "https://i.pravatar.cc/150?img=15",
  };

  const storedAdmin =
    JSON.parse(localStorage.getItem("loggedInUser")) ||
    JSON.parse(localStorage.getItem("admin"));

  const [adminData, setAdminData] = useState(storedAdmin || defaultAdmin);
  const [isEditing, setIsEditing] = useState(false);

  const products = JSON.parse(localStorage.getItem("medicines")) || [];
  const users = JSON.parse(localStorage.getItem("list")) || [];
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("loggedInUser", JSON.stringify(adminData));
    localStorage.setItem("admin", JSON.stringify(adminData));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="admin-profile-page">
      <header className="admin-profile-header">
        <div>
          <h1>Admin Profile</h1>
          <p>Manage your HealthHub admin account</p>
        </div>

        <button
          className="admin-profile-icon-btn"
          onClick={() => navigate("/admindashboard")}
        >
          <span className="material-symbols-outlined">dashboard</span>
        </button>
      </header>

      <div className="admin-profile-content">
        <div className="admin-profile-card">
          <img
            src={adminData.image}
            alt={adminData.name}
            className="admin-profile-avatar"
          />

          {isEditing ? (
            <input
              name="name"
              value={adminData.name || ""}
              onChange={handleChange}
              className="admin-profile-input center"
            />
          ) : (
            <h2>{adminData.name}</h2>
          )}

          {isEditing ? (
            <input
              name="email"
              value={adminData.email || ""}
              onChange={handleChange}
              className="admin-profile-input center"
            />
          ) : (
            <p>{adminData.email}</p>
          )}

          <span className="admin-profile-badge">{adminData.role || "Admin"}</span>
        </div>

        <div className="admin-profile-stats">
          <div className="admin-profile-stat">
            <h3>{products.length}</h3>
            <p>Products</p>
          </div>

          <div className="admin-profile-stat">
            <h3>{users.length}</h3>
            <p>Users</p>
          </div>

          <div className="admin-profile-stat">
            <h3>{orders.length}</h3>
            <p>Orders</p>
          </div>
        </div>

        <div className="admin-profile-info">
          <h3>Admin Information</h3>

          <div className="admin-profile-row">
            <span>Full Name</span>
            {isEditing ? (
              <input
                name="name"
                value={adminData.name || ""}
                onChange={handleChange}
              />
            ) : (
              <strong>{adminData.name}</strong>
            )}
          </div>

          <div className="admin-profile-row">
            <span>Email</span>
            {isEditing ? (
              <input
                name="email"
                value={adminData.email || ""}
                onChange={handleChange}
              />
            ) : (
              <strong>{adminData.email}</strong>
            )}
          </div>

          <div className="admin-profile-row">
            <span>Phone</span>
            {isEditing ? (
              <input
                name="phone"
                value={adminData.phone || ""}
                onChange={handleChange}
              />
            ) : (
              <strong>{adminData.phone}</strong>
            )}
          </div>

          <div className="admin-profile-row">
            <span>Address</span>
            {isEditing ? (
              <input
                name="address"
                value={adminData.address || ""}
                onChange={handleChange}
              />
            ) : (
              <strong>{adminData.address}</strong>
            )}
          </div>

          <div className="admin-profile-row">
            <span>Joined</span>
            <strong>{adminData.joined || "2026"}</strong>
          </div>
        </div>

        <div className="admin-profile-actions">
          {isEditing ? (
            <button onClick={handleSave}>
              <span className="material-symbols-outlined">save</span>
              Save Profile
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)}>
              <span className="material-symbols-outlined">edit</span>
              Edit Profile
            </button>
          )}

          <button onClick={() => navigate("/addproduct")}>
            <span className="material-symbols-outlined">add_box</span>
            Add Product
          </button>

          <button onClick={() => navigate("/productlist")}>
            <span className="material-symbols-outlined">inventory_2</span>
            Product List
          </button>

          <button className="logout" onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;