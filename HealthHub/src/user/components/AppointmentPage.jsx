import React, { useEffect, useState } from "react";
import "./appointmentpage.css";
import { useNavigate } from "react-router-dom";

function AppointmentPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    doctor: "",
    date: "",
    time: "",
    phone: "",
    email: "",
    problem: "",
  });

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem("book")) || [];
    setAppointments(savedAppointments);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.doctor.trim() ||
      !formData.date.trim() ||
      !formData.time.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.problem.trim()
    ) {
      alert("Please fill all appointment details");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      ...formData,
      status: "Pending",
    };

    const updatedAppointments = [newAppointment, ...appointments];

    setAppointments(updatedAppointments);

    localStorage.setItem("book", JSON.stringify(updatedAppointments));

    setFormData({
      name: "",
      doctor: "",
      date: "",
      time: "",
      phone: "",
      email: "",
      problem: "",
    });

    alert("Appointment booked successfully ✅");
  };

  const cancelAppointment = (id) => {
    const updatedAppointments = appointments.map((item) =>
      item.id === id ? { ...item, status: "Cancelled" } : item,
    );

    setAppointments(updatedAppointments);

    localStorage.setItem("book", JSON.stringify(updatedAppointments));
  };

  const clearCancelledAppointments = () => {
    const activeAppointments = appointments.filter(
      (item) => item.status !== "Cancelled",
    );

    setAppointments(activeAppointments);

    localStorage.setItem("book", JSON.stringify(activeAppointments));
  };

  return (
    <div className="appointment-page">
      <header className="appointment-header">
        <div className="appointment-header-left">
          <div className="appointment-title-wrap">
            <h1>Appointment</h1>
            <p>Book and manage your medical appointments</p>
          </div>
        </div>

        <div className="appointment-header-actions">
          <button
            className="appointment-icon-btn"
            onClick={() => navigate("/userhome")}
          >
            <span className="material-symbols-outlined">home</span>
          </button>

          <button
            className="appointment-icon-btn"
            onClick={() => navigate("/profile")}
          >
            <span className="material-symbols-outlined">person</span>
          </button>

          <button
            className="appointment-icon-btn"
            onClick={() => navigate("/invoice")}
          >
            <span className="material-symbols-outlined">receipt_long</span>
          </button>
        </div>
      </header>

      <div className="appointment-container">
        {/* FORM */}

        <div className="appointment-form-card">
          <div className="appointment-card-top">
            <h2>Book Appointment</h2>
            <p>Fill the form to schedule your consultation</p>
          </div>

          <form className="appointment-form" onSubmit={handleBookAppointment}>
            <div className="appointment-grid">
              <input
                type="text"
                name="name"
                placeholder="Patient Name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="doctor"
                placeholder="Doctor Name"
                value={formData.doctor}
                onChange={handleChange}
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

              <input
                type="time"
                name="time"
                value={formData.time}
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
            </div>

            <textarea
              name="problem"
              placeholder="Describe your problem"
              rows="5"
              value={formData.problem}
              onChange={handleChange}
            ></textarea>

            <button type="submit" className="appointment-book-btn">
              <span className="material-symbols-outlined">calendar_month</span>
              Book Appointment
            </button>
          </form>
        </div>

        {/* APPOINTMENTS */}

        <div className="appointment-list-card">
          <div className="appointment-card-top appointment-list-top">
            <div>
              <h2>Booked Appointments</h2>
              <p>{appointments.length} appointments found</p>
            </div>

            <button
              className="appointment-clear-btn"
              onClick={clearCancelledAppointments}
            >
              <span className="material-symbols-outlined">delete_sweep</span>
              Clear Cancelled
            </button>
          </div>

          {appointments.length > 0 ? (
            <div className="appointment-list">
              {appointments.map((item) => (
                <div className="appointment-item" key={item.id}>
                  <div className="appointment-item-top">
                    <h3>{item.name}</h3>

                    <span
                      className={`appointment-status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="appointment-item-info">
                    <p>
                      <strong>Doctor:</strong> {item.doctor}
                    </p>

                    <p>
                      <strong>Date:</strong> {item.date}
                    </p>

                    <p>
                      <strong>Time:</strong> {item.time}
                    </p>

                    <p>
                      <strong>Phone:</strong> {item.phone}
                    </p>

                    <p>
                      <strong>Email:</strong> {item.email}
                    </p>

                    <p>
                      <strong>Problem:</strong> {item.problem}
                    </p>
                  </div>

                  {item.status !== "Cancelled" && (
                    <button
                      className="appointment-cancel-btn"
                      onClick={() => cancelAppointment(item.id)}
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="appointment-empty">
              <h3>No appointments booked yet</h3>
              <p>Your booked appointments will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentPage;
