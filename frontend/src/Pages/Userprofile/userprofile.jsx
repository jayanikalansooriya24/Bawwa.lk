import React, { useContext, useEffect, useState } from "react";
import "./userprofile.css";
import { StoreContext } from "../../context/StoreContext";

const UserProfile = () => {
  const { users, setUsers } = useContext(StoreContext);
  const [latestUser, setLatestUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (users.length > 0) {
      const lastUser = users[users.length - 1];
      setLatestUser(lastUser);
      setFormData({ ...lastUser });
    }
  }, [users]);

  if (!latestUser) {
    return <p>No user profile found. Please register first.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("pet.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        pet: {
          ...prev.pet,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = () => {
    const updatedUsers = [...users];
    updatedUsers[updatedUsers.length - 1] = formData;
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setLatestUser(formData);
    setIsEditing(false);
  };

  const { firstName, lastName, email, phone, pet } = formData;

  return (
    <div className="profile-container">
      <h1 className="profile-title"><span className="icon">👤</span>My Profile</h1>
      <div className="profile-content">
      <div className="profile-image">
          {pet.image ? (
            <img src={pet.image} alt="Pet Profile" />
          ) : (
            <img src="https://via.placeholder.com/150" alt="Pet Profile" />
          )}
        </div>
        <div className="profile-details">
          
          <div className="info-section">
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
                <p><strong>Pet Name:</strong> {pet.name}</p>
                <p><strong>Age:</strong> {pet.age}</p>
                <p><strong>Gender:</strong> {pet.gender}</p>
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Type:</strong> {pet.type}</p>
              </>
            )}
          </div>
        </div>
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
            <p><strong>Phone No:</strong> {phone}</p>
          </>
        )}
      </div>

      <div className="profile-buttons">
        <button className="btn blue">My Appointments</button>
        <button className="btn blue">Upcoming Vaccination</button>

        {isEditing ? (
          <button className="btn green" onClick={handleUpdate}>Save</button>
        ) : (
          <button className="btn blue" onClick={() => setIsEditing(true)}>Update</button>
        )}

        <button className="btn red">Delete</button>
      </div>
    </div>
  );
};

export default UserProfile;
