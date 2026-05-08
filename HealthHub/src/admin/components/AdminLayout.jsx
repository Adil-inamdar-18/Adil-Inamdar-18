import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./adminlayout.css";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <h2 className="admin-logo">HealthHub</h2>
          <p className="admin-subtitle">Admin Panel</p>

          <nav>
            <NavLink to="/admindashboard">Dashboard</NavLink>
            <NavLink to="/adminprofile">Admin Profile</NavLink>
            <NavLink to="/addproduct">Add Medicine</NavLink>
            <NavLink to="/productlist">Product List</NavLink>
            <NavLink to="/userhome">View Store</NavLink>
          </nav>
        </div>

        <button className="admin-logout-btn" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;