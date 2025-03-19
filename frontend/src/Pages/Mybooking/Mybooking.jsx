import React, { useEffect, useState } from "react";
import "./Mybooking.css"; // Import CSS file

const Mybooking = () => {
  const [bookings, setBookings] = useState([]);

  // Load bookings from local storage on component mount
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <div className="mybooking-container">
      <h2 className="mybooking-title">My Appointments</h2>
      {bookings.length === 0 ? (
        <p>No appointments booked yet.</p>
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
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.contact}</td>
                <td>{booking.service}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Mybooking;
