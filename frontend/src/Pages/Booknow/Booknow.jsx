import React, { useState } from "react";
import axios from "axios";
import "./Booknow.css";

const Booknow = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    service: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isContactValid, setIsContactValid] = useState(false);

  // Validate inputs
  const validate = () => {
    let newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces.";
    }

    if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact number must be exactly 10 digits.";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain '@'.";
    }

    const today = new Date().toISOString().split("T")[0];
    if (formData.date < today) {
      newErrors.date = "Appointment date cannot be in the past.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      setIsEmailValid(value.includes("@"));
    }
    if (name === "contact") {
      setIsContactValid(/^\d{10}$/.test(value));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post("http://127.0.0.1:4000/api/appointments/book", formData);
      alert("Appointment booked successfully!");
      console.log(response.data);
      setFormData({ name: "", email: "", contact: "", service: "", date: "", time: "" });
      setErrors({});
      setIsEmailValid(false);
      setIsContactValid(false);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <div className="booknow-container">
      <h2 className="booknow-title">Book Your Appointment</h2>
      <form onSubmit={handleSubmit} className="booknow-form">
        <div className="booknow-row">
          {/* Column 1 */}
          <div className="booknow-column">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="Enter your email" 
              title="Enter a valid email with '@'"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <label htmlFor="contact">Contact:</label>
            <input 
              type="text" 
              id="contact" 
              name="contact" 
              value={formData.contact} 
              onChange={handleChange} 
              required 
              placeholder="Enter 10-digit contact number" 
              title="Must be exactly 10 digits" 
              disabled={!isEmailValid} 
            />
            {errors.contact && <p className="error-text">{errors.contact}</p>}

            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="Enter your full name" 
              title="Name can only contain letters and spaces" 
              disabled={!isContactValid} 
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          {/* Column 2 */}
          <div className="booknow-column">
            <label htmlFor="service">Service Type:</label>
            <select 
              id="service" 
              name="service" 
              value={formData.service} 
              onChange={handleChange} 
              required 
              disabled={!isContactValid} 
              aria-label="Select a service type" 
              title="Choose a service from the list"
            >
              <option value="">Select Service</option>
              <option value="Grooming">Grooming</option>
              <option value="Boarding">Boarding</option>
              <option value="Veterinary">Veterinary</option>
              <option value="Vaccination">Vaccination</option>
            </select>

            <label htmlFor="date">Appointment Date:</label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              required 
              min={new Date().toISOString().split("T")[0]} 
              disabled={!isContactValid} 
              title="Select an available appointment date"
            />
            {errors.date && <p className="error-text">{errors.date}</p>}

            <label htmlFor="time">Appointment Time:</label>
            <input 
              type="time" 
              id="time" 
              name="time" 
              value={formData.time} 
              onChange={handleChange} 
              required 
              disabled={!isContactValid} 
              title="Select an available appointment time"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="booknow-button-container">
          <button type="submit" className="booknow-button" disabled={!isContactValid}>
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Booknow;
