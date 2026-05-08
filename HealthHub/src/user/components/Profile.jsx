import React, { useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const defaultUser = {
    name: "Adil Inamdar",
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

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // save updated data
  const handleSave = () => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        {/* <button
          className="profile-icon-btn"
          onClick={() => navigate("/userhome")}
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button> */}

        <h1>My Profile</h1>

        <button className="profile-icon-btn">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      {/* PROFILE CARD */}
      <div className="profile-card">
        <img
          src={userData.image}
          alt={userData.name}
          className="profile-avatar"
        />

        {isEditing ? (
          <input
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="profile-input"
          />
        ) : (
          <h2>{userData.name}</h2>
        )}

        {isEditing ? (
          <input
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="profile-input"
          />
        ) : (
          <p>{userData.email}</p>
        )}

        <span className="profile-badge">{userData.role}</span>
      </div>

      {/* STATS */}
      <div className="profile-stats">
        <div className="profile-stat-box">
          <h3>0</h3>
          <p>Orders</p>
        </div>
        <div className="profile-stat-box">
          <h3>{favorites.length}</h3>
          <p>Favorites</p>
        </div>
        <div className="profile-stat-box">
          <h3>{cart.length}</h3>
          <p>Cart</p>
        </div>
      </div>

      {/* INFO */}
      <div className="profile-info-card">
        <h3>Personal Information</h3>

        <div className="profile-info-row">
          <span>Full Name</span>
          {isEditing ? (
            <input name="name" value={userData.name} onChange={handleChange} />
          ) : (
            <strong>{userData.name}</strong>
          )}
        </div>

        <div className="profile-info-row">
          <span>Email</span>
          {isEditing ? (
            <input
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          ) : (
            <strong>{userData.email}</strong>
          )}
        </div>

        <div className="profile-info-row">
          <span>Phone</span>
          {isEditing ? (
            <input
              name="phone"
              value={userData.phone}
              onChange={handleChange}
            />
          ) : (
            <strong>{userData.phone}</strong>
          )}
        </div>

        <div className="profile-info-row">
          <span>Address</span>
          {isEditing ? (
            <input
              name="address"
              value={userData.address}
              onChange={handleChange}
            />
          ) : (
            <strong>{userData.address}</strong>
          )}
        </div>

        <div className="profile-info-row">
          <span>Member Since</span>
          <strong>{userData.memberSince}</strong>
        </div>
      </div>

      {/* MENU */}
      <div className="profile-menu">
        {/* EDIT / SAVE BUTTON */}
        {isEditing ? (
          <button className="profile-menu-item" onClick={handleSave}>
            <span className="material-symbols-outlined">save</span>
            Save Profile
          </button>
        ) : (
          <button
            className="profile-menu-item"
            onClick={() => setIsEditing(true)}
          >
            <span className="material-symbols-outlined">edit</span>
            Edit Profile
          </button>
        )}

        <button
          className="profile-menu-item"
          onClick={() => navigate("/invoice")}
        >
          <span className="material-symbols-outlined">inventory_2</span>
          Invoices
        </button>

        <button
          className="profile-menu-item"
          onClick={() => navigate("/favirote")}
        >
          <span className="material-symbols-outlined">favorite</span>
          Wishlist
        </button>

        <button className="profile-menu-item" onClick={() => navigate("/cart")}>
          <span className="material-symbols-outlined">shopping_cart</span>
          Cart
        </button>

        <button
          className="profile-menu-item"
          onClick={() => navigate("/appointment")}
        >
          <span className="material-symbols-outlined">notifications</span>
          Appointment
        </button>

        <button className="profile-menu-item logout" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
