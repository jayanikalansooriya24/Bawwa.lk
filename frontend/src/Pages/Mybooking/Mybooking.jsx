import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Mybooking.css";

const Mybooking = () => {
  const [appointments, setAppointments] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      alert("Appointment deleted successfully!");
      fetchAppointments(); // Refresh list
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  // Enable edit mode
  const handleEdit = (appointment) => {
    setEditing(appointment._id);
    setEditData(appointment);
  };

  // Handle input change in edit mode
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Submit updated appointment
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${editing}`, editData);
      alert("Appointment updated successfully!");
      setEditing(null);
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <div className="mybooking-container">
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="mybooking-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                {editing === appointment._id ? (
                  <>
                    <td><input type="text" name="name" value={editData.name} onChange={handleChange} /></td>
                    <td><input type="email" name="email" value={editData.email} onChange={handleChange} /></td>
                    <td><input type="text" name="contact" value={editData.contact} onChange={handleChange} /></td>
                    <td>
                      <select name="service" value={editData.service} onChange={handleChange}>
                        <option value="Grooming">Grooming</option>
                        <option value="Boarding">Boarding</option>
                        <option value="Veterinary">Veterinary</option>
                        <option value="Vaccination">Vaccination</option>
                      </select>
                    </td>
                    <td><input type="date" name="date" value={editData.date} onChange={handleChange} /></td>
                    <td><input type="time" name="time" value={editData.time} onChange={handleChange} /></td>
                    <td>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={() => setEditing(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{appointment.name}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.contact}</td>
                    <td>{appointment.service}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>
                      <button onClick={() => handleEdit(appointment)}>Edit</button>
                      <button onClick={() => handleDelete(appointment._id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Mybooking;
