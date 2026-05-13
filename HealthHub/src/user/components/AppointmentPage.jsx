import React, { useEffect, useState } from "react";
import "./appointmentpage.css";

function AppointmentPage() {
  const [errors, setErrors] = useState({});

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
    setAppointments(Array.isArray(savedAppointments) ? savedAppointments : []);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Patient name is required";
    if (!formData.doctor.trim()) newErrors.doctor = "Doctor name is required";
    if (!formData.date.trim()) newErrors.date = "Date is required";
    if (!formData.time.trim()) newErrors.time = "Time is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.problem.trim()) newErrors.problem = "Problem is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newAppointment = {
      id: Date.now(),
      ...formData,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
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

    setErrors({});
  };

  const cancelAppointment = (id) => {
    const updatedAppointments = appointments.map((item) =>
      item.id === id ? { ...item, status: "Cancelled" } : item
    );

    setAppointments(updatedAppointments);
    localStorage.setItem("book", JSON.stringify(updatedAppointments));
  };

  const clearCancelledAppointments = () => {
    const activeAppointments = appointments.filter(
      (item) => item.status !== "Cancelled"
    );

    setAppointments(activeAppointments);
    localStorage.setItem("book", JSON.stringify(activeAppointments));
  };

  return (
    <main className="appointment-page">
      <div className="appointment-page-header">
        <div>
          <h1>Appointments</h1>
          <p>Book and manage your medical consultations</p>
        </div>

        <span className="appointment-header-icon material-symbols-outlined">
          event_available
        </span>
      </div>

      <section className="appointment-layout">
        <div className="appointment-form-card">
          <div className="appointment-card-title">
            <h2>Book Appointment</h2>
            <p>Fill patient details and schedule your consultation</p>
          </div>

          <form className="appointment-form" onSubmit={handleBookAppointment}>
            <div className="appointment-grid">
              <div className="appointment-field">
                <label>Patient Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter patient name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "appointment-input-error" : ""}
                />
                {errors.name && <span>{errors.name}</span>}
              </div>

              <div className="appointment-field">
                <label>Doctor Name</label>
                <input
                  type="text"
                  name="doctor"
                  placeholder="Enter doctor name"
                  value={formData.doctor}
                  onChange={handleChange}
                  className={errors.doctor ? "appointment-input-error" : ""}
                />
                {errors.doctor && <span>{errors.doctor}</span>}
              </div>

              <div className="appointment-field">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={errors.date ? "appointment-input-error" : ""}
                />
                {errors.date && <span>{errors.date}</span>}
              </div>

              <div className="appointment-field">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={errors.time ? "appointment-input-error" : ""}
                />
                {errors.time && <span>{errors.time}</span>}
              </div>

              <div className="appointment-field">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "appointment-input-error" : ""}
                />
                {errors.phone && <span>{errors.phone}</span>}
              </div>

              <div className="appointment-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "appointment-input-error" : ""}
                />
                {errors.email && <span>{errors.email}</span>}
              </div>
            </div>

            <div className="appointment-field appointment-full">
              <label>Problem Description</label>
              <textarea
                name="problem"
                placeholder="Describe your problem"
                rows="5"
                value={formData.problem}
                onChange={handleChange}
                className={errors.problem ? "appointment-input-error" : ""}
              ></textarea>
              {errors.problem && <span>{errors.problem}</span>}
            </div>

            <button type="submit" className="appointment-book-btn">
              <span className="material-symbols-outlined">calendar_month</span>
              Book Appointment
            </button>
          </form>
        </div>

        <div className="appointment-list-card">
          <div className="appointment-list-top">
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
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.createdAt || "Recently booked"}</p>
                    </div>

                    <span
                      className={`appointment-status ${String(
                        item.status || "pending"
                      ).toLowerCase()}`}
                    >
                      {item.status || "Pending"}
                    </span>
                  </div>

                  <div className="appointment-item-info">
                    <p>
                      <span>Doctor</span>
                      <strong>{item.doctor}</strong>
                    </p>

                    <p>
                      <span>Date</span>
                      <strong>{item.date}</strong>
                    </p>

                    <p>
                      <span>Time</span>
                      <strong>{item.time}</strong>
                    </p>

                    <p>
                      <span>Phone</span>
                      <strong>{item.phone}</strong>
                    </p>

                    <p>
                      <span>Email</span>
                      <strong>{item.email}</strong>
                    </p>

                    <p className="full">
                      <span>Problem</span>
                      <strong>{item.problem}</strong>
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
              <span className="material-symbols-outlined">event_busy</span>
              <h3>No appointments booked yet</h3>
              <p>Your booked appointments will appear here.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default AppointmentPage;