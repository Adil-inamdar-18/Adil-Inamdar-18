import React, { useState } from "react";
import "./checkout.css";
import { useCart } from "../components/context/CartContext";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const [method, setMethod] = useState("upi");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    pincode: "",
    upiId: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const { cartItems, subtotal, tax, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = () => {
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.city.trim() ||
      !formData.address.trim() ||
      !formData.pincode.trim()
    ) {
      alert("Please fill address details");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (method === "upi" && !formData.upiId.trim()) {
      alert("Please enter UPI ID");
      return;
    }

    if (
      method === "card" &&
      (!formData.cardName.trim() ||
        !formData.cardNumber.trim() ||
        !formData.expiry.trim() ||
        !formData.cvv.trim())
    ) {
      alert("Please fill card details");
      return;
    }

    const now = new Date();
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: "ORD" + Date.now(),
      items: cartItems.map((item) => ({
        _id: item._id || item.id || Date.now().toString(),
        name: item.name,
        brand: item.brand || "",
        price: Number(item.price) || 0,
        qty: Number(item.qty) || 1,
        imageUrl: item.imageUrl || item.image || "",
      })),
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        address: formData.address,
        pincode: formData.pincode,
      },
      paymentMethod: method,
      subtotal: Number(subtotal) || 0,
      tax: Number(tax) || 0,
      total: Number(total) || 0,
      status: "Pending",
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      createdAt: now.toISOString(),
    };

    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

    clearCart();
    alert("Order placed successfully ✅");
    navigate("/orders");
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <div className="checkout-header-left">
          <button
            className="checkout-icon-btn"
            onClick={() => navigate("/cart")}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          <div className="checkout-title-wrap">
            <h1>Checkout</h1>
            <p>Complete your medicine order safely</p>
          </div>
        </div>

        <div className="checkout-header-actions">
          <button
            className="checkout-icon-btn"
            onClick={() => navigate("/userhome")}
          >
            <span className="material-symbols-outlined">home</span>
          </button>

          <button
            className="checkout-icon-btn"
            onClick={() => navigate("/cart")}
          >
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>

          <div className="checkout-badge">{cartItems.length} Items</div>
        </div>
      </header>

      <div className="checkout-wrapper">
        <div className="checkout-left">
          <div className="checkout-card">
            <h2>Delivery Details</h2>
            <p className="checkout-subtitle">
              Enter your address and payment details
            </p>

            <div className="checkout-list">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />

              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>

            <h3>Payment Method</h3>

            <div className="payment-methods">
              <label className={method === "upi" ? "active-method" : ""}>
                <input
                  type="radio"
                  name="payment"
                  checked={method === "upi"}
                  onChange={() => setMethod("upi")}
                />
                <span>UPI</span>
              </label>

              <label className={method === "card" ? "active-method" : ""}>
                <input
                  type="radio"
                  name="payment"
                  checked={method === "card"}
                  onChange={() => setMethod("card")}
                />
                <span>Card</span>
              </label>
            </div>

            {method === "upi" ? (
              <div className="payment-box">
                <input
                  type="text"
                  name="upiId"
                  placeholder="Enter UPI ID"
                  value={formData.upiId}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="payment-box checkout-list">
                <input
                  type="text"
                  name="cardName"
                  placeholder="Card Holder Name"
                  value={formData.cardName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </div>
            )}

            <button
              className="checkout-btn"
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>

        <div className="checkout-right">
          <div className="summary-card">
            <h3>Order Summary</h3>

            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item, index) => (
                  <div className="summary-item" key={item._id || item.id || index}>
                    <span>
                      {item.name} {item.qty ? `x${item.qty}` : ""}
                    </span>
                    <span>
                      ${((Number(item.price) || 0) * (Number(item.qty) || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="summary-line"></div>

                <div className="summary-item">
                  <span>Subtotal</span>
                  <span>${Number(subtotal).toFixed(2)}</span>
                </div>

                <div className="summary-item">
                  <span>Tax</span>
                  <span>${Number(tax).toFixed(2)}</span>
                </div>

                <div className="summary-item">
                  <span>Shipping</span>
                  <span className="free-text">Free</span>
                </div>

                <div className="summary-line"></div>

                <div className="summary-total">
                  <span>Total</span>
                  <span>${Number(total).toFixed(2)}</span>
                </div>
              </>
            ) : (
              <p className="checkout-empty">Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;