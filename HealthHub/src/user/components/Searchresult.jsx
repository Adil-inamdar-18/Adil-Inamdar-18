import React from "react";
import "../components/searchresult.css"
function Searchresult() {
  return (
    <div>
      <header className="header">
        <div className="header-top">
          <button className="icon-btn">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          <h1>Search Results</h1>

          <button className="icon-btn">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>

        <div className="search-box">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Search products..."
            value="headphones"
          />
          <button className="clear-btn">
            <span className="material-symbols-outlined">cancel</span>
          </button>
        </div>
      </header>

      <div className="filters">
        <button className="active">All</button>
        <button>Electronics</button>
        <button>Audio</button>
        <button>Accessories</button>
        <button className="filter-btn">
          <span className="material-symbols-outlined">tune</span> Filter
        </button>
      </div>

      <div className="result-text">
        Found 48 results for <b>"headphones"</b>
      </div>

      <main className="products">
        <div className="card">
          <div className="img-box">
            <img src="https://picsum.photos/300/300" alt="" />
            <button className="fav">❤</button>
          </div>

          <div className="card-body">
            <h3>Sony WH-1000XM5</h3>
            <p>⭐⭐⭐⭐⭐ 4.9</p>

            <div className="bottom">
              <span>$349.99</span>
              <button className="cart">+</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="img-box">
            <img src="https://picsum.photos/301/300" alt="" />
            <button className="fav active">❤</button>
          </div>

          <div className="card-body">
            <h3>Bose QuietComfort</h3>
            <p>⭐⭐⭐⭐⭐ 4.8</p>

            <div className="bottom">
              <span>$299.00</span>
              <button className="cart">+</button>
            </div>
          </div>
        </div>
      </main>

      <nav className="bottom-nav">
        <a>Home</a>
        <a className="active">Search</a>
        <button className="cart-main">🛒</button>
        <a>Saved</a>
        <a>Profile</a>
      </nav>
    </div>
  );
}

export default Searchresult;
