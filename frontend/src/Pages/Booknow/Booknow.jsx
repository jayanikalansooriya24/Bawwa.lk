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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:4000/api/appointments/book", formData);
      alert("Appointment booked successfully!");
      console.log(response.data);
      setFormData({ name: "", email: "", contact: "", service: "", date: "", time: "" }); // Reset form
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }
  };

  return (
    
    <div className="booknow-container"
    
    >
        
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
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
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
