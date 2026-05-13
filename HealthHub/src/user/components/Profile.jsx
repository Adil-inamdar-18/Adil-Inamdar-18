import React, { useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const defaultUser = {
    name: "Adil Inamdar",
    username: "adil",
    email: "adil@example.com",
    phone: "+91 9876543210",
    role: "User",
    address: "Nagpur, Maharashtra, India",
    memberSince: "2026",
    image: "https://i.pravatar.cc/150?img=12",
  };

  const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [userData, setUserData] = useState(storedUser || defaultUser);
  const [isEditing, setIsEditing] = useState(false);

  const favorites = JSON.parse(localStorage.getItem("favirote")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const invoices = JSON.parse(localStorage.getItem("orders")) || [];
  const appointments = JSON.parse(localStorage.getItem("book")) || [];

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUserData(storedUser || defaultUser);
    setIsEditing(false);
  };

  return (
    <main className="profile-page">
      <header className="profile-top-header">
        <div>
          <h1>My Account</h1>
          <p>Manage your profile, orders, wishlist and HealthHub activity</p>
        </div>

        <button className="profile-home-btn" onClick={() => navigate("/userhome")}>
          <span className="material-symbols-outlined">home</span>
          Back to Store
        </button>
      </header>

      <section className="profile-layout">
        {/* LEFT PANEL */}
        <aside className="profile-sidebar">
          <div className="profile-user-box">
            <img
              src={userData.image || defaultUser.image}
              alt={userData.name}
              className="profile-avatar"
            />

            <div>
              <p>Hello,</p>
              <h2>{userData.name}</h2>
              <span>{userData.email}</span>
            </div>
          </div>

          <div className="profile-side-menu">
            <button className="active">
              <span className="material-symbols-outlined">person</span>
              Account Overview
            </button>

            <button onClick={() => navigate("/orders")}>
              <span className="material-symbols-outlined">inventory_2</span>
              My Orders / Invoices
            </button>

            <button onClick={() => navigate("/favirote")}>
              <span className="material-symbols-outlined">favorite</span>
              Wishlist
            </button>

            <button onClick={() => navigate("/cart")}>
              <span className="material-symbols-outlined">shopping_cart</span>
              My Cart
            </button>

            <button onClick={() => navigate("/appointment")}>
              <span className="material-symbols-outlined">calendar_month</span>
              Appointments
            </button>

            <button onClick={() => navigate("/contact")}>
              <span className="material-symbols-outlined">support_agent</span>
              Help Center
            </button>

            <button className="logout" onClick={handleLogout}>
              <span className="material-symbols-outlined">logout</span>
              Logout
            </button>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <section className="profile-content">
          <div className="profile-welcome-card">
            <div>
              <span className="profile-badge">{userData.role || "User"}</span>
              <h2>Welcome back, {userData.name}</h2>
              <p>
                View your account details, manage saved information and check your
                shopping activity.
              </p>
            </div>

            {!isEditing ? (
              <button className="profile-edit-btn" onClick={() => setIsEditing(true)}>
                <span className="material-symbols-outlined">edit</span>
                Edit Profile
              </button>
            ) : (
              <div className="profile-edit-actions">
                <button className="profile-save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="profile-cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="profile-stats-grid">
            <div className="profile-stat-card" onClick={() => navigate("/orders")}>
              <span className="material-symbols-outlined">local_shipping</span>
              <div>
                <h3>{invoices.length}</h3>
                <p>Orders</p>
              </div>
            </div>

            <div className="profile-stat-card" onClick={() => navigate("/favirote")}>
              <span className="material-symbols-outlined">favorite</span>
              <div>
                <h3>{favorites.length}</h3>
                <p>Wishlist</p>
              </div>
            </div>

            <div className="profile-stat-card" onClick={() => navigate("/cart")}>
              <span className="material-symbols-outlined">shopping_bag</span>
              <div>
                <h3>{cart.length}</h3>
                <p>Cart Items</p>
              </div>
            </div>

            <div className="profile-stat-card" onClick={() => navigate("/appointment")}>
              <span className="material-symbols-outlined">event_available</span>
              <div>
                <h3>{appointments.length}</h3>
                <p>Appointments</p>
              </div>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="profile-card-title">
              <h3>Personal Information</h3>
              <p>Your basic account and contact details</p>
            </div>

            <div className="profile-info-grid">
              <div className="profile-field">
                <label>Full Name</label>
                {isEditing ? (
                  <input name="name" value={userData.name || ""} onChange={handleChange} />
                ) : (
                  <strong>{userData.name}</strong>
                )}
              </div>

              <div className="profile-field">
                <label>Username</label>
                {isEditing ? (
                  <input
                    name="username"
                    value={userData.username || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <strong>{userData.username || "Not added"}</strong>
                )}
              </div>

              <div className="profile-field">
                <label>Email Address</label>
                {isEditing ? (
                  <input name="email" value={userData.email || ""} onChange={handleChange} />
                ) : (
                  <strong>{userData.email}</strong>
                )}
              </div>

              <div className="profile-field">
                <label>Phone Number</label>
                {isEditing ? (
                  <input name="phone" value={userData.phone || ""} onChange={handleChange} />
                ) : (
                  <strong>{userData.phone || "Not added"}</strong>
                )}
              </div>

              <div className="profile-field full">
                <label>Delivery Address</label>
                {isEditing ? (
                  <input
                    name="address"
                    value={userData.address || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <strong>{userData.address || "No address added"}</strong>
                )}
              </div>

              <div className="profile-field">
                <label>Member Since</label>
                <strong>{userData.memberSince || "2026"}</strong>
              </div>

              <div className="profile-field">
                <label>Account Type</label>
                <strong>{userData.role || userData.type || "User"}</strong>
              </div>
            </div>
          </div>

          <div className="profile-quick-card">
            <div className="profile-card-title">
              <h3>Quick Actions</h3>
              <p>Frequently used account options</p>
            </div>

            <div className="profile-quick-grid">
              <button onClick={() => navigate("/invoice")}>
                <span className="material-symbols-outlined">receipt_long</span>
                Invoices
              </button>

              <button onClick={() => navigate("/favirote")}>
                <span className="material-symbols-outlined">favorite</span>
                Wishlist
              </button>

              <button onClick={() => navigate("/cart")}>
                <span className="material-symbols-outlined">shopping_cart</span>
                Cart
              </button>

              <button onClick={() => navigate("/priscription")}>
                <span className="material-symbols-outlined">upload_file</span>
                Prescription
              </button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Profile;