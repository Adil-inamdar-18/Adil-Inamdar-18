import { useEffect, useState } from "react";
import "./invoice.css";

function InvoicePage() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const cancelOrder = (id) => {
    const updatedOrders = orders.map((item) =>
      item.id === id ? { ...item, status: "Cancelled" } : item
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const clearCancelledOrders = () => {
    const filteredOrders = orders.filter(
      (item) => item.status !== "Cancelled"
    );

    setOrders(filteredOrders);
    localStorage.setItem("orders", JSON.stringify(filteredOrders));
  };

  const getOrderTotal = (order) => {
    if (order.total || order.amount) {
      return Number(order.total || order.amount);
    }

    if (Array.isArray(order.items)) {
      return order.items.reduce((sum, item) => {
        if (typeof item === "string") return sum;
        return sum + Number(item.price || 0) * Number(item.qty || 1);
      }, 0);
    }

    return 0;
  };

  const handlePrintInvoice = (order) => {
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${order.id}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              color: #0f172a;
            }

            .invoice-box {
              max-width: 800px;
              margin: auto;
              border: 1px solid #ddd;
              padding: 30px;
              border-radius: 12px;
            }

            .header {
              display: flex;
              justify-content: space-between;
              border-bottom: 2px solid #0f766e;
              padding-bottom: 15px;
              margin-bottom: 20px;
            }

            h1 {
              color: #0f766e;
              margin: 0;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }

            th,
            td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }

            th {
              background: #f0fdfa;
              color: #0f766e;
            }

            .total {
              text-align: right;
              margin-top: 20px;
              font-size: 20px;
              font-weight: bold;
              color: #0f766e;
            }

            .cancelled {
              color: #dc2626;
              font-weight: bold;
            }

            .footer {
              margin-top: 30px;
              text-align: center;
              color: #64748b;
            }
          </style>
        </head>

        <body>
          <div class="invoice-box">
            <div class="header">
              <div>
                <h1>HealthHub</h1>
                <p>Medical Store Invoice</p>
              </div>

              <div>
                <p><strong>Invoice ID:</strong> ${order.id}</p>
                <p><strong>Date:</strong> ${order.date || "N/A"}</p>
                <p><strong>Time:</strong> ${order.time || "N/A"}</p>
                <p><strong>Status:</strong> 
                  <span class="${order.status === "Cancelled" ? "cancelled" : ""}">
                    ${order.status || "Pending"}
                  </span>
                </p>
              </div>
            </div>

            <p><strong>Customer Name:</strong> ${user.name || "Customer"}</p>
            <p><strong>Email:</strong> ${user.email || "N/A"}</p>
            <p><strong>Phone:</strong> ${user.phone || "N/A"}</p>
            <p><strong>Address:</strong> ${user.address || "N/A"}</p>

            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                ${
                  order.items && Array.isArray(order.items)
                    ? order.items
                        .map((item) => {
                          const name =
                            typeof item === "string" ? item : item.name;
                          const qty = typeof item === "string" ? 1 : item.qty || 1;
                          const price =
                            typeof item === "string" ? 0 : Number(item.price || 0);
                          const amount = price * qty;

                          return `
                            <tr>
                              <td>${name || "Medicine"}</td>
                              <td>${qty}</td>
                              <td>₹${price.toFixed(2)}</td>
                              <td>₹${amount.toFixed(2)}</td>
                            </tr>
                          `;
                        })
                        .join("")
                    : `<tr><td colspan="4">No product details</td></tr>`
                }
              </tbody>
            </table>

            <div class="total">
              Total: ₹${getOrderTotal(order).toFixed(2)}
            </div>

            <div class="footer">
              <p>Thank you for shopping with HealthHub.</p>
              <p>This is a computer generated invoice.</p>
            </div>
          </div>

          <script>
            window.print();
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="invoice-page">
      <div className="invoice-header">
        <div>
          <h1>Download Invoices</h1>
          <p>Your HealthHub order invoices and bills</p>
        </div>

        <button className="clear-orders-btn" onClick={clearCancelledOrders}>
          Clear Cancelled
        </button>
      </div>

      <div className="invoice-grid">
        {orders.length > 0 ? (
          orders.map((item, index) => (
            <div className="invoice-card" key={item.id || index}>
              <div className="invoice-card-top">
                <h3>{item.id}</h3>
                <span
                  className={
                    item.status === "Cancelled"
                      ? "invoice-status cancelled"
                      : "invoice-status"
                  }
                >
                  {item.status || "Pending"}
                </span>
              </div>

              <div className="invoice-details">
                <p>
                  <strong>Customer:</strong> {user.name || "Customer"}
                </p>

                <p>
                  <strong>Date:</strong> {item.date || "N/A"}
                </p>

                <p>
                  <strong>Time:</strong> {item.time || "N/A"}
                </p>

                <p>
                  <strong>Products:</strong>{" "}
                  {Array.isArray(item.items) ? item.items.length : 0}
                </p>

                <p>
                  <strong>Total Amount:</strong> ₹
                  {getOrderTotal(item).toFixed(2)}
                </p>
              </div>

              <div className="invoice-btns">
                <button
                  onClick={() => handlePrintInvoice(item)}
                  className="download-btn"
                >
                  Download
                </button>

                {item.status !== "Cancelled" && (
                  <button
                    onClick={() => cancelOrder(item.id)}
                    className="cancel-order-btn"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-invoice">No invoices available</div>
        )}
      </div>
    </div>
  );
}

export default InvoicePage;