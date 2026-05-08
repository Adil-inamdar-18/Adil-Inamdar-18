import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./UserLayout.css";

function UserLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="user-layout">
      <aside className="sidebar">
        <div className="sidebar-top">
          <h2 className="logo">HealthHub</h2>

          <nav>
            <NavLink to="/userhome">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/priscription">Prescription</NavLink>
            <NavLink to="/favirote">Favorites</NavLink>
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/appointment">Appointment</NavLink>
            <NavLink to="/invoice">Invoices</NavLink>
            <NavLink to="/doctorinfo">Doctor Info</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </aside>

      <main className="user-content">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;