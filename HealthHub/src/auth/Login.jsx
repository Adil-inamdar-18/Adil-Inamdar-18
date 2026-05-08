import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    name: "",
    pass: "",
    check: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.pass) {
      alert("Please enter username and password");
      return;
    }
    const list = JSON.parse(localStorage.getItem("list")) || [];
    const user = list.find(
      (u) =>
        (u.name === data.name ||
          u.username === data.name ||
          u.email === data.name) &&
        u.pass === data.pass,
    );
    if (!user) {
      alert("Invalid Credential");
      return;
    }
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    if (user.type === "admin") {
      navigate("/admindashboard");
      return;
    } else {
      navigate("/userhome");
    }
  };

  return (
    <>
      <div className="background"></div>

      <main className="login-wrapper page-background">
        <div className="login-card">
          {/* Logo */}
          <div className="login-logo-section">
            <div className="login-logo-circle">
              <span className="material-symbols-outlined">shopping_bag</span>
            </div>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label>Email or Username</label>
              <div className="login-input-box">
                <span className="material-symbols-outlined">person</span>
                <input
                  type="text"
                  placeholder="Enter email or username"
                  value={data.name}
                  onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="login-input-group">
              <label>Password</label>
              <div className="login-input-box">
                <span className="material-symbols-outlined">lock</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={data.pass}
                  onChange={(e) => {
                    setData({ ...data, pass: e.target.value });
                  }}
                />
                <span className="material-symbols-outlined login-eye">
                  visibility
                </span>
              </div>
            </div>

            <button type="submit" className="login-btn">
              Sign In
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          {/* Social Login */}
          <div className="login-social">
            <div className="login-separator">Or continue with</div>
            <div className="login-social-buttons">
              <button type="button">
                <img src="https://www.google.com/favicon.ico" alt="Google" />
                Google
              </button>
              <button type="button">
                <img src="https://www.apple.com/favicon.ico" alt="Apple" />
                Apple
              </button>
            </div>
          </div>

          {/* Signup */}
          <p className="login-signup">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Join now</span>
          </p>
        </div>
      </main>
    </>
  );
}

export default Login;
