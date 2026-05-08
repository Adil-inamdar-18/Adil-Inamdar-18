import React, { useEffect, useMemo, useState } from "react";
import "./shoppingcart.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/CartContext";

function ShoppingCart() {
  const navigate = useNavigate();

  const {
    cartItems = [],
    cartCount = 0,
    subtotal = 0,
    tax = 0,
    total = 0,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const [fallbackCart, setFallbackCart] = useState([]);

  useEffect(() => {
    const syncCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setFallbackCart(Array.isArray(savedCart) ? savedCart : []);
    };

    syncCart();
    window.addEventListener("cartUpdated", syncCart);

    return () => {
      window.removeEventListener("cartUpdated", syncCart);
    };
  }, []);

  const finalCartItems = useMemo(() => {
    if (cartItems.length > 0) return cartItems;
    return fallbackCart;
  }, [cartItems, fallbackCart]);

  const finalCartCount = useMemo(() => {
    if (cartItems.length > 0) return cartCount;
    return finalCartItems.reduce((sum, item) => sum + Number(item.qty || 1), 0);
  }, [cartItems.length, cartCount, finalCartItems]);

  const finalSubtotal = useMemo(() => {
    if (cartItems.length > 0) return subtotal;
    return finalCartItems.reduce(
      (sum, item) =>
        sum +
        Number(item.price || item.mrp || item.cost || 0) *
          Number(item.qty || 1),
      0,
    );
  }, [cartItems.length, subtotal, finalCartItems]);

  const finalTax = useMemo(() => {
    if (cartItems.length > 0) return tax;
    return finalSubtotal * 0.05;
  }, [cartItems.length, tax, finalSubtotal]);

  const finalTotal = useMemo(() => {
    if (cartItems.length > 0) return total;
    return finalSubtotal + finalTax;
  }, [cartItems.length, total, finalSubtotal, finalTax]);

  const getImageUrl = (url) => {
    if (!url) {
      return "https://via.placeholder.com/300x300?text=No+Image";
    }

    if (url.startsWith("http") || url.startsWith("data:image")) {
      return url;
    }

    return `https://batch-6-backend-production.up.railway.app${url}`;
  };

  const handleDecrease = (itemId, qty) => {
    if (qty <= 1) {
      removeFromCart(itemId);

      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updated = savedCart.filter(
        (item, index) =>
          String(item._id || item.id || index) !== String(itemId),
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      setFallbackCart(updated);
      window.dispatchEvent(new Event("cartUpdated"));
      return;
    }

    decreaseQty(itemId);

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updated = savedCart.map((item, index) => {
      const currentId = item._id || item.id || index;
      if (String(currentId) === String(itemId)) {
        return { ...item, qty: Number(item.qty || 1) - 1 };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updated));
    setFallbackCart(updated);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleIncrease = (itemId) => {
    increaseQty(itemId);

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updated = savedCart.map((item, index) => {
      const currentId = item._id || item.id || index;
      if (String(currentId) === String(itemId)) {
        return { ...item, qty: Number(item.qty || 1) + 1 };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updated));
    setFallbackCart(updated);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updated = savedCart.filter(
      (item, index) => String(item._id || item.id || index) !== String(itemId),
    );
    localStorage.setItem("cart", JSON.stringify(updated));
    setFallbackCart(updated);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="cart-page">
      <header className="cart-header">
        <div className="cart-header-left">
      

          <div className="cart-title-wrap">
            <h1>My Cart</h1>
            <p>{finalCartCount} Items in cart</p>
          </div>
        </div>

        <div className="cart-header-actions">
          <button
            className="cart-icon-btn"
            onClick={() => navigate("/userhome")}
          >
            <span className="material-symbols-outlined">home</span>
          </button>

          <button
            className="cart-icon-btn fav-btn"
            onClick={() => navigate("/favirote")}
          >
            <span className="material-symbols-outlined">favorite</span>

            {JSON.parse(localStorage.getItem("favirote"))?.length > 0 && (
              <span className="fav-count">
                {JSON.parse(localStorage.getItem("favirote")).length}
              </span>
            )}
          </button>

          <div className="cart-badge">{finalCartCount} Items</div>
        </div>
      </header>

      <div className="cart-body">
        {finalCartItems.length > 0 ? (
          finalCartItems.map((item, index) => {
            const itemId = item._id || item.id || index;

            return (
              <div className="cart-item" key={itemId}>
                <div
                  className="cart-delete"
                  onClick={() => handleRemove(itemId)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </div>

                <div
                  className="cart-img"
                  style={{
                    backgroundImage: `url("${getImageUrl(
                      item.imageUrl || item.image || item.img,
                    )}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>

                <div className="cart-details">
                  <p className="cart-title">
                    {item.name || item.title || item.productName || "Medicine"}
                  </p>

                  <div className="cart-bottom">
                    <span className="cart-price">
                      $
                      {Number(item.price || item.mrp || item.cost || 0).toFixed(
                        2,
                      )}
                    </span>

                    <div className="cart-qty">
                      <button
                        onClick={() => handleDecrease(itemId, item.qty || 1)}
                      >
                        -
                      </button>
                      <span>{item.qty || 1}</span>
                      <button onClick={() => handleIncrease(itemId)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="cart-empty">Your cart is empty</p>
        )}
      </div>

      <div className="cart-summary">
        <div className="cart-row">
          <span>Subtotal</span>
          <span>${Number(finalSubtotal).toFixed(2)}</span>
        </div>

        <div className="cart-row">
          <span>Shipping</span>
          <span className="cart-green">Free</span>
        </div>

        <div className="cart-row">
          <span>Tax</span>
          <span>${Number(finalTax).toFixed(2)}</span>
        </div>

        <div className="cart-total">
          <span>Total</span>
          <span>${Number(finalTotal).toFixed(2)}</span>
        </div>

        <button
          className="cart-checkout"
          onClick={() => navigate("/checkout")}
          disabled={finalCartItems.length === 0}
        >
          Checkout →
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
