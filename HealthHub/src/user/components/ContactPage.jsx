import React from "react";
import "./contact.css";

function ContactPage() {
  return (
    <div className="container">
      <h2>Contact Support</h2>

      <p>Email: support@healthhub.com</p>
      <p>Phone: +91 9876543210</p>

      <h3>Help Form</h3>
      <input placeholder="Your Name" />
      <input placeholder="Email" />
      <textarea placeholder="Message"></textarea>

      <button>Send</button>
    </div>
  );
}

export default ContactPage;