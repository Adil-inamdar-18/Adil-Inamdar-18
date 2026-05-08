import React, { useEffect, useState } from "react";
import "./orders.css";
import { useNavigate } from "react-router-dom";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
  setOrders([...savedOrders].reverse());
}, []);

  const removeOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="orders-page">
      <div className="orders-wrapper">
        <div className="orders-header">
          <div>
            <h1>My Orders</h1>
            <p>Track your recent medicine orders</p>
          </div>

          <button className="orders-home-btn" onClick={() => navigate("/userhome")}>
            Back Home
          </button>
        </div>

        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-top">
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p>{order.createdAt}</p>
                  </div>

                  <span className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-customer">
                  <h4>Customer Details</h4>
                  <p><strong>Name:</strong> {order.customer.name}</p>
                  <p><strong>Phone:</strong> {order.customer.phone}</p>
                  <p><strong>Email:</strong> {order.customer.email}</p>
                  <p><strong>City:</strong> {order.customer.city}</p>
                  <p><strong>Address:</strong> {order.customer.address}</p>
                  <p><strong>Pincode:</strong> {order.customer.pincode}</p>
                  <p><strong>Payment:</strong> {order.paymentMethod.toUpperCase()}</p>
                </div>

                <div className="order-items">
                  <h4>Ordered Items</h4>
                  {order.items.map((item) => (
                    <div className="order-item-row" key={item._id}>
                      <span>
                        {item.name} {item.qty ? `x${item.qty}` : ""}
                      </span>
                      <span>${((item.price || 0) * (item.qty || 1)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="order-summary-row">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="order-summary-row">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="order-summary-row total-row">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  className="order-delete-btn"
                  onClick={() => removeOrder(order.id)}
                >
                  Remove Order
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="orders-empty">
            <h3>No orders found</h3>
            <p>You have not placed any order yet.</p>
            <button onClick={() => navigate("/userhome")}>Shop Now</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;