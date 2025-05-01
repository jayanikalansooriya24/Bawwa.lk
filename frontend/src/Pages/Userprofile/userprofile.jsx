import React, { useEffect, useState } from "react";
import "./userprofile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/latest");
        const data = await res.json();
        if (res.ok) setUser(data);
        else console.error("User not found");
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("http://localhost:5000/api/user/latest", {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        alert("🗑️ User deleted successfully!");
        setUser(null);
      } else {
        alert("❌ Failed to delete user: " + data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ Something went wrong!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("pet.")) {
      const field = name.split(".")[1];
      setUser((prev) => ({ ...prev, pet: { ...prev.pet, [field]: value } }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (!user) return <p>Loading...</p>;

  const { firstName, lastName, email, phone, pet } = user;

  return (
    <div className="profile-container">
      <h1 className="profile-title">👤 My Profile</h1>
      <div className="profile-content">
        <div className="profile-image">
          <img src={pet.image || "https://via.placeholder.com/150"} alt="Pet" />
        </div>
        <div className="profile-details">
          <h2>Pet Information</h2>
          {isEditing ? (
            <>
              <input name="pet.name" value={pet.name} onChange={handleChange} />
              <input name="pet.age" value={pet.age} onChange={handleChange} />
              <input name="pet.gender" value={pet.gender} onChange={handleChange} />
              <input name="pet.breed" value={pet.breed} onChange={handleChange} />
              <input name="pet.type" value={pet.type} onChange={handleChange} />
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {pet.name}</p>
              <p><strong>Age:</strong> {pet.age}</p>
              <p><strong>Gender:</strong> {pet.gender}</p>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Type:</strong> {pet.type}</p>
            </>
          )}
        </div>
        <div className="owner-info">
          <h2>Owner Information</h2>
          {isEditing ? (
            <>
              <input name="firstName" value={firstName} onChange={handleChange} />
              <input name="lastName" value={lastName} onChange={handleChange} />
              <input name="email" value={email} onChange={handleChange} />
              <input name="phone" value={phone} onChange={handleChange} />
            </>
          ) : (
            <>
              <p><strong>First Name:</strong> {firstName}</p>
              <p><strong>Last Name:</strong> {lastName}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Phone:</strong> {phone}</p>
            </>
          )}
        </div>
      </div>
      <div className="profile-buttons">
        <button className="btn blue">Appointments</button>
        <button className="btn blue">Vaccinations</button>
        <button className="btn green" onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Save" : "Update"}</button>
        <button className="btn red" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default UserProfile;
