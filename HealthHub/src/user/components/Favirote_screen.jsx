import React, { useEffect, useMemo, useState } from "react";
import "../components/favirotescreen.css";
import { useNavigate } from "react-router-dom";

function Favirotescreen() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const saveditems = JSON.parse(localStorage.getItem("favirote")) || [];
    setItems(saveditems);
  }, []);

  const getImageUrl = (url) => {
    if (!url) {
      return "https://via.placeholder.com/300x300?text=No+Image";
    }

    if (url.startsWith("http") || url.startsWith("data:image")) {
      return url;
    }

    return `https://batch-6-backend-production.up.railway.app${url}`;
  };

  const removeItem = (id) => {
    const updateditems = items.filter((i) => (i._id || i.id) !== id);
    setItems(updateditems);
    localStorage.setItem("favirote", JSON.stringify(updateditems));
  };

  const filteredItems = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return items;

    return items.filter(
      (item) =>
        item.name?.toLowerCase().includes(search) ||
        item.brand?.toLowerCase().includes(search) ||
        item.category?.toLowerCase().includes(search),
    );
  }, [items, searchTerm]);

  return (
    <div className="fav-page">
      <header className="fav-header">
        <div className="fav-header-left">
       

          <div className="fav-title-wrap">
            <h1>My Favorites</h1>
            <p>{items.length} ITEMS SAVED</p>
          </div>
        </div>

        <div className="fav-header-actions">
          <button
            className="fav-icon-btn fav-desktop-icon"
            onClick={() => navigate("/userhome")}
          >
            <span className="material-symbols-outlined">home</span>
          </button>

          <button
            className="fav-icon-btn cart-btn"
            onClick={() => navigate("/cart")}
          >
            <span className="material-symbols-outlined">shopping_cart</span>

            {JSON.parse(localStorage.getItem("cart"))?.length > 0 && (
              <span className="cart-count">
                {JSON.parse(localStorage.getItem("cart")).length}
              </span>
            )}
          </button>

          <button
            className="fav-icon-btn fav-desktop-icon"
            onClick={() => navigate("/profile")}
          >
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </header>

      {/* <div className="fav-search-wrap">
        <span className="material-symbols-outlined fav-search-icon">
          search
        </span>
        <input
          className="fav-search"
          type="search"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}

      <main className="fav-container">
        <div className="fav-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const itemId = item._id || item.id || index;

              return (
                <div className="fav-card" key={itemId}>
                  <div
                    className="fav-card-img"
                    style={{
                      backgroundImage: `url("${getImageUrl(
                        item.imageUrl || item.image,
                      )}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <button
                      className="fav-fav-btn"
                      onClick={() => removeItem(itemId)}
                    >
                      ❤
                    </button>
                  </div>

                  <div className="fav-card-body">
                    <h3>{item.name}</h3>
                    <p>{item.brand || item.category || "Medicine"}</p>

                    <div className="fav-card-bottom">
                      <span>${Number(item.price || 0).toFixed(2)}</span>
                      <button onClick={() => removeItem(itemId)}>Remove</button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="fav-empty">
              <h3>No favorites found</h3>
              <p>Add medicines to favorites from the user home page.</p>
            </div>
          )}
        </div>
      </main>

      <nav className="fav-mobile-nav">
        <button onClick={() => navigate("/userhome")}>
          <span className="material-symbols-outlined">home</span>
          <small>Home</small>
        </button>

        <button onClick={() => navigate("/cart")}>
          <span className="material-symbols-outlined">shopping_cart</span>
          <small>Cart</small>
        </button>

        <button onClick={() => navigate("/profile")}>
          <span className="material-symbols-outlined">person</span>
          <small>Profile</small>
        </button>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "My Favorite Medicines",
                text: "Check out my saved favorite medicines.",
              });
            }
          }}
        >
          <span className="material-symbols-outlined">share</span>
          <small>Share</small>
        </button>
      </nav>
    </div>
  );
}

export default Favirotescreen;
