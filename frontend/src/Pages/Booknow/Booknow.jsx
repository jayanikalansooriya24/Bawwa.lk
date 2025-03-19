import React, { useState } from "react";
import "./Booknow.css"; // Import CSS file

const Booknow = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    service: "",
    date: "",
    time: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", formData);
    alert("Appointment booked successfully!");
  };

  return (
    <div className="booknow-container">
      <h2 className="booknow-title">Book Your Appointment</h2>
      <form onSubmit={handleSubmit} className="booknow-form">
        <div className="booknow-row">
          {/* Column 1 */}
          <div className="booknow-column">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Contact:</label>
            <input type="number" name="number" value={formData.number} onChange={handleChange} required />



          </div>

          {/* Column 2 */}
          <div className="booknow-column">
            <label>Service Type:</label>
            <select name="service" value={formData.service} onChange={handleChange} required>
              <option value="">Select Service</option>
              <option value="Grooming">Grooming</option>
              <option value="Boarding">Boarding</option>
              <option value="Veterinary">Veterinary</option>
              <option value="Vaccination">Vaccination</option>
              <option value="petBoarding">pet Boarding</option>

            </select>

            <label>Appointment Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />

            <label>Appointment Time:</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          </div>
        </div>

        {/* Submit Button */}
        <div className="booknow-button-container">
          <button type="submit" className="booknow-button">Book Now</button>
        </div>
      </form>
    </div>
  );
};

export default Booknow;
