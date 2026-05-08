import React from "react";
import "./doctorinfo.css";

function DoctorInfoPage() {
  return (
    <div className="container">
      <h2>Health Information</h2>

      <div className="card">
        <h4>Fever Care</h4>
        <p>Drink water, rest, and take proper medication.</p>
      </div>

      <div className="card">
        <h4>Vitamin Guide</h4>
        <p>Daily vitamins improve immunity.</p>
      </div>

      <h3>Medicine Guidance</h3>
      <ul>
        <li>Check expiry date</li>
        <li>Follow dosage</li>
        <li>Consult doctor if needed</li>
      </ul>
    </div>
  );
}

export default DoctorInfoPage;
