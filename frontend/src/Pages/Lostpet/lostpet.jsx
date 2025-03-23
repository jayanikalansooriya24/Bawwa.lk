import React, { useState } from "react";
import "./lostpet.css";
import dog from "../../assets/2.jpeg";
import cat from "../../assets/3.jpg";

const LostPet = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact: "",
    description: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const newPet = {
        id: lostPets.length + 1,
        name: formData.name,
        location: formData.location,
        contact: formData.contact,
        image: image || "" // fallback in case image is null
      };
  
      setLostPets([newPet, ...lostPets]); // Add new pet to the top of the list
      alert("Lost pet reported successfully!");
  
      // Reset form
      setFormData({ name: "", location: "", contact: "", description: "" });
      setImage(null);
      setErrors({});
    }
  };
  
  const [errors, setErrors] = useState({});

  const [lostPets, setLostPets] = useState([
    { id: 1, name: "Buddy", location: "Central Park, Malabe", contact: "(071) 456-7890", image: dog },
    { id: 2, name: "Luna", location: "Sunset Blvd, Kaduwela", contact: "(076) 654-3210", image: cat }
  ]);
  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Pet name is required.";
    if (!formData.location.trim()) errors.location = "Location is required.";
    if (!formData.contact.trim()) {
      errors.contact = "Contact information is required.";
    } else if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(formData.contact)) {
      errors.contact = "Enter a valid phone number (e.g., 071-456-7890).";
    }
    if (!formData.description.trim()) errors.description = "Description is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-wrap justify-center items-start p-6 gap-8">
      {/* Report Lost Pet */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Report a Lost Pet</h1>

        {image && (
          <img
            src={image}
            alt="Lost Pet"
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        )}

        <label className="block text-gray-700 font-medium mb-2">Upload Pet Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded-md mb-4"
        />

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Pet Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter pet's name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Last Seen Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter last known location"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Contact Information</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your contact details"
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Provide additional details"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <button>Submit</button>
          <button>Download Poster</button>
        </form>
      </div>

      {/* Currently Lost Pets */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Currently Lost Pets</h2>
        {lostPets.length > 0 ? (
          lostPets.map((pet) => (
            <div key={pet.id} className="mb-4 p-4 bg-gray-50 border rounded-md shadow-sm">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-xl font-bold text-center">{pet.name}</h3>
              <p className="text-center">
                <strong>Last Seen:</strong> {pet.location}
              </p>
              <p className="text-center">
                <strong>Contact:</strong> {pet.contact}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No lost pet notices available.</p>
        )}
      </div>
    </div>
  );
};

export default LostPet;
