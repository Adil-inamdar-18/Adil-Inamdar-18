import React, { useEffect, useMemo, useState } from "react";
import "./admindashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const adminData = JSON.parse(localStorage.getItem("admin")) || {
    name: "Admin",
  };

  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];
    const storedPrescriptions =
      JSON.parse(localStorage.getItem("prescriptions")) || [];

    const uniqueCategories = [
      ...new Set(storedMedicines.map((item) => item.category).filter(Boolean)),
    ];

    setMedicines(storedMedicines);
    setCategories(uniqueCategories);
    setPrescriptions(storedPrescriptions);
  }, []);

  const handleProfileNavigate = () => {
    navigate("/adminprofile");
  };

  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/60x60?text=Med";

    return url.startsWith("http") || url.startsWith("data:image")
      ? url
      : `https://batch-6-backend-production.up.railway.app${url}`;
  };

  const filteredMedicines = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return medicines;

    return medicines.filter(
      (item) =>
        item.name?.toLowerCase().includes(term) ||
        item.category?.toLowerCase().includes(term) ||
        item.brand?.toLowerCase().includes(term)
    );
  }, [searchTerm, medicines]);

  const totalCategories = categories.length;
  const totalMedicines = medicines.length;
  const totalPrescriptions = prescriptions.length;

  const recentPrescriptions = [...prescriptions].slice(0, 4);

  return (
    <div className="ads-page">
      <main className="ads-main">
        <section className="ads-topbar">
          <div className="ads-topbar-text">
            <h2>Hello, {adminData.name}</h2>
            <p>Here is a quick overview of your medicine store.</p>
          </div>

          <div className="ads-topbar-right">
            <div className="ads-search-wrap">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button className="ads-icon-btn" aria-label="Notifications">
              <span className="material-symbols-outlined">notifications</span>
            </button>

            <button
              className="ads-icon-btn"
              aria-label="Profile"
              onClick={handleProfileNavigate}
            >
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
        </section>

        <section className="ads-stats-grid">
          <div className="ads-stat-card">
            <div className="ads-stat-icon">
              <span className="material-symbols-outlined">medication</span>
            </div>
            <p className="ads-stat-title">Total Medicines</p>
            <h3 className="ads-stat-value">{totalMedicines}</h3>
          </div>

          <div className="ads-stat-card">
            <div className="ads-stat-icon">
              <span className="material-symbols-outlined">category</span>
            </div>
            <p className="ads-stat-title">Categories</p>
            <h3 className="ads-stat-value">{totalCategories}</h3>
          </div>

          <div className="ads-stat-card">
            <div className="ads-stat-icon">
              <span className="material-symbols-outlined">upload_file</span>
            </div>
            <p className="ads-stat-title">Prescriptions</p>
            <h3 className="ads-stat-value">{totalPrescriptions}</h3>
          </div>
        </section>

        <section className="ads-content-grid">
          <div className="ads-panel">
            <div className="ads-panel-head">
              <h3>Medicine Categories</h3>
              <button className="ads-text-btn">View</button>
            </div>

            <div className="ads-category-list">
              {categories.length > 0 ? (
                categories.map((cat, i) => (
                  <div key={i} className="ads-category-item">
                    <div className="ads-category-row">
                      <span>{cat}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="ads-empty-text">No categories found.</p>
              )}
            </div>
          </div>

          <div className="ads-panel">
            <div className="ads-panel-head">
              <h3>Quick Actions</h3>
            </div>

            <div className="ads-quick-actions">
              <button onClick={() => navigate("/addproduct")}>
                <span>Add Medicine</span>
              </button>

              <button onClick={() => navigate("/productlist")}>
                <span>View Medicines</span>
              </button>

              <button onClick={() => navigate("/userhome")}>
                <span>Open Store</span>
              </button>

              <button onClick={() => navigate("/adminprofile")}>
                <span>Admin Profile</span>
              </button>
            </div>
          </div>
        </section>

        <section className="ads-panel ads-table-panel">
          <div className="ads-panel-head">
            <h3>Medicines Overview</h3>
            <button
              className="ads-text-btn"
              onClick={() => navigate("/productlist")}
            >
              View All
            </button>
          </div>

          <div className="ads-table-wrap">
            {filteredMedicines.length > 0 ? (
              <table className="ads-table">
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMedicines.slice(0, 6).map((item, index) => (
                    <tr key={item._id || index}>
                      <td className="ads-product-cell">
                        <img src={getImageUrl(item.imageUrl)} alt={item.name} />
                        <span>{item.name}</span>
                      </td>
                      <td>{item.category}</td>
                      <td>₹{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="ads-empty-text">No medicines found.</p>
            )}
          </div>
        </section>

        <section className="ads-panel ads-table-panel">
          <div className="ads-panel-head">
            <h3>Recent Prescriptions</h3>
          </div>

          <div className="ads-table-wrap">
            {recentPrescriptions.length > 0 ? (
              <table className="ads-table">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Type</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {recentPrescriptions.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{item.name}</td>
                      <td>{item.type || "Unknown"}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="ads-empty-text">No prescriptions uploaded yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;