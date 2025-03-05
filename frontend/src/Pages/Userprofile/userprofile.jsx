import React, { useState, useRef } from "react";
import { FaUser, FaPaw, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";
import { Upload, X, Venus, Mars } from "lucide-react";
import "./UserProfile.css"; // Ensure you have a CSS file for styling

const UserProfile = () => {
  const fileInputRef = useRef(null);
  
  const [profileData, setProfileData] = useState({
    user: { firstName: "John", lastName: "Doe", email: "johndoe@example.com", phone: "123-456-7890" },
    pet: { name: "Buddy", breed: "Golden Retriever", age: "3", gender: "male", birthdate: "2021-05-12", image: null }
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setProfileData((prev) => ({
          ...prev,
          user: { ...prev.user, image: reader.result }
        }));
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileData((prev) => ({
      ...prev,
      user: { ...prev.user, image: null }
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>

      <div className="profile-card">
        <div className="profile-image">
          {profileData.user.image ? (
            <img src={profileData.user.image} alt="Profile" />
          ) : (
            <div className="image-placeholder">No Profile Image</div>
          )}
          <label className="upload-label">
            <Upload /> Upload Profile Picture
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} hidden />
          </label>
          {profileData.user.image && <button onClick={removeImage}><X /> Remove</button>}
        </div>

        <div className="profile-info">
          {!editing ? (
            <>
              <p><FaUser /> <strong>Name:</strong> {profileData.user.firstName} {profileData.user.lastName}</p>
              <p><FaEnvelope /> <strong>Email:</strong> {profileData.user.email}</p>
              <p><FaPhone /> <strong>Phone:</strong> {profileData.user.phone}</p>
              <h3><FaPaw /> Pet Details</h3>
              <p><strong>Name:</strong> {profileData.pet.name}</p>
              <p><strong>Breed:</strong> {profileData.pet.breed}</p>
              <p><strong>Age:</strong> {profileData.pet.age} years</p>
              <p><strong>Birthdate:</strong> {profileData.pet.birthdate}</p>
              <p><strong>Gender:</strong> {profileData.pet.gender === "male" ? <Mars /> : <Venus />} {profileData.pet.gender}</p>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          ) : (
            <>
              <input type="text" name="firstName" value={profileData.user.firstName} onChange={(e) => handleChange(e, "user")} placeholder="First Name" />
              <input type="text" name="lastName" value={profileData.user.lastName} onChange={(e) => handleChange(e, "user")} placeholder="Last Name" />
              <input type="email" name="email" value={profileData.user.email} onChange={(e) => handleChange(e, "user")} placeholder="Email" />
              <input type="tel" name="phone" value={profileData.user.phone} onChange={(e) => handleChange(e, "user")} placeholder="Phone Number" />
              
              <h3><FaPaw /> Edit Pet Details</h3>
              <input type="text" name="name" value={profileData.pet.name} onChange={(e) => handleChange(e, "pet")} placeholder="Pet Name" />
              <input type="text" name="breed" value={profileData.pet.breed} onChange={(e) => handleChange(e, "pet")} placeholder="Breed" />
              <input type="text" name="age" value={profileData.pet.age} onChange={(e) => handleChange(e, "pet")} placeholder="Age" />
              <input type="date" name="birthdate" value={profileData.pet.birthdate} onChange={(e) => handleChange(e, "pet")} />

              <button onClick={() => setEditing(false)}>Save</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
