import React from "react";
import "./userprofile.css";

const UserProfile = () => {
  return (
    <div className="profile-container">
      <h1 className="profile-title">
        <span className="icon">👤</span> Profile
      </h1>
      <div className="profile-content">
        <div className="profile-image">
          <img src="https://via.placeholder.com/150" alt="Pet Profile" />
        </div>
        <div className="profile-details">
          <div className="info-section">
            <p><strong>Petname:</strong> Petname</p>
            <p><strong>Birthday:</strong> Birthday</p>
            <p><strong>Age:</strong> Age</p>
            <p><strong>Gender:</strong> Gender</p>
            <p><strong>Breed:</strong> Breed</p>
            <p><strong>Type:</strong> Type</p>
          </div>
        </div>
      </div>
      <div className="owner-info">
        <h2>Owner Information</h2>
        <p><strong>Firstname:</strong> firstname</p>
        <p><strong>Lastname:</strong> lastname</p>
        <p><strong>Email:</strong> email</p>
        <p><strong>PhoneNo:</strong> phoneno</p>
      </div>
      <div className="profile-buttons">
        <button className="btn blue">My Appointments</button>
        <button className="btn blue">Upcoming Vaccination</button>
        <button className="btn blue">Update</button>
        <button className="btn red">Delete</button>
      </div>
    </div>
  );
};

export default UserProfile;
