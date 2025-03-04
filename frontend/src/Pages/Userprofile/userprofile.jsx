import React, { useState, useEffect } from "react";
import { FaUser, FaPaw, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) setProfile(storedProfile);
  }, []);

  return (
    <div className="profile-container">
      <h2><FaUser /> User Profile</h2>
      {profile ? (
        <>
          <p><strong>Name:</strong> {profile.user.firstName} {profile.user.lastName}</p>
          <p><strong>Email:</strong> {profile.user.email}</p>
          <p><strong>Phone:</strong> {profile.user.phone}</p>

          <h3><FaPaw /> Pet Information</h3>
          <p><strong>Pet Name:</strong> {profile.pet.name}</p>
          <p><strong>Breed:</strong> {profile.pet.breed}</p>
          <p><strong>Birthdate:</strong> {profile.pet.birthdate || "N/A"}</p>
          <p><strong>Age:</strong> {profile.pet.age}</p>

          {profile.pet.image && <img src={profile.pet.image} alt="Pet" className="pet-image" />}
        </>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};

export default UserProfile;
