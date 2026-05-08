import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function Signup() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    pass: "",
    confirm: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !data.name ||
      !data.username ||
      !data.email ||
      !data.pass ||
      !data.confirm ||
      !data.type
    ) {
      alert("Please fill all fields");
      return;
    }
    if (data.pass !== data.confirm) {
      alert("password does not match");
      return;
    }
    setLoading(true);

    const existing = JSON.parse(localStorage.getItem("list")) || [];
    const exists = existing.find((item) => item.email === data.email);

    if (exists) {
      alert("User already exists ❌");
      setLoading(false);
      return;
    }
    const { confirm, ...userData } = data;
    const newList = [...existing, userData];
    localStorage.setItem("list", JSON.stringify(newList));
    alert("Account created successfully ✅");
    setData({
      name: "",
      email: "",
      pass: "",
      type: "",
      confirm: "",
      username: "",
    });
    setLoading(false);

    navigate("/");
  };

  return (
    <main className="signup-page-background">
      <div className="signup-card">
        {/* Header */}
        <div className="signup-header">
          <button onClick={() => navigate("/")} className="signup-back-btn">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2>Create Account</h2>
        </div>

        {/* Hero */}
        <div
          className="signup-hero"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAESoGCStp6nBZTQ5BqAx9ru0s8QXDyBfRPkcnnR338FJtfnI0xgDioBkbo5g25g7Ug0NBITmYYofgGJYM8tVIvndBATPgTOA8Cms2xpRle4Su2TYd1e4F4NvTTsOU_NkCijBtYYxdno8iQA5N32uLzjyF5FgZyh5Cx50g-J0X2waETV-WmmGqWRwnn18F2d6AdJKOEKiOBwegK1ZyHbWPs3S3NK4WQk-Vd9vNQn0PXecFaT0MbUi7PFUwz3J-IBQxlhDEfFymR0VU')`,
          }}
        >
          <div className="signup-hero-content">
            <h1>Join Us</h1>
            <p>Start your premium shopping journey today.</p>
          </div>
        </div>

        {/* Form */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-input-group">
            <label>Full Name</label>
            <div className="signup-input-box">
              <span className="material-symbols-outlined">person</span>
              <input
                type="text"
                placeholder="John Doe"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                  setServerError("");
                }}
              />
            </div>
          </div>
          <div className="signup-input-group">
            <label>User Name</label>
            <div className="signup-input-box">
              <span className="material-symbols-outlined">person</span>
              <input
                type="text"
                placeholder="John Doe"
                value={data.username}
                onChange={(e) => {
                  setData({ ...data, username: e.target.value });
                  setServerError("");
                }}
              />
            </div>
          </div>

          <div className="signup-input-group">
            <label>Email Address</label>
            <div className="signup-input-box">
              <span className="material-symbols-outlined">mail</span>
              <input
                type="email"
                placeholder="name@example.com"
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                  setServerError("");
                }}
              />
            </div>
          </div>

          <div className="signup-input-group">
            <label>Password</label>
            <div className="signup-input-box">
              <span className="material-symbols-outlined">lock</span>
              <input
                type="password"
                placeholder="••••••••"
                value={data.pass}
                onChange={(e) => {
                  setData({ ...data, pass: e.target.value });
                  setServerError("");
                }}
              />
            </div>
          </div>
          <div className="signup-input-group">
            <label>Confirm Password</label>
            <div className="signup-input-box">
              <span className="material-symbols-outlined">lock</span>
              <input
                type="password"
                placeholder="••••••••"
                value={data.confirm}
                onChange={(e) => {
                  setData({ ...data, confirm: e.target.value });
                  setServerError("");
                }}
              />
            </div>
          </div>

          <div className="signup-checkbox-group">
            <select
              value={data.type}
              onChange={(e) => {
                setData({ ...data, type: e.target.value });
                setServerError("");
              }}
            >
              <option value="">Select Type</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="signup-btn-primary"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {serverError && <p className="signup-error">{serverError}</p>}
        </form>

        {/* Social Signup */}
        <div className="signup-social">
          <div className="signup-social-text">Or sign up with</div>
          <div className="signup-social-buttons">
            <button>
              <img src="https://www.google.com/favicon.ico" alt="Google" />
              Google
            </button>
            <button>
              <img src="https://www.apple.com/favicon.ico" alt="Apple" />
              Apple
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
