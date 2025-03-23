import React, { useState } from "react";
import "./lostpet.css";
import dog from "../../assets/2.jpeg";
import cat from "../../assets/3.jpg";
import jsPDF from "jspdf";

const LostPet = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact: "",
    description: ""
  });
  const generatePoster = () => {
    const { name, location, contact, description } = formData;
  
    // ✅ Check for empty fields or missing image
    if (!image || !name.trim() || !location.trim() || !contact.trim() || !description.trim()) {
      alert("❗ Please complete all fields and upload an image before generating the poster.");
      return;
    }
  
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [350, 500],
    });
  
    fetch(image)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
  
          // === Poster layout ===
          doc.setFillColor(255, 244, 228);
          doc.rect(0, 0, 350, 500, "F");
  
          doc.setFontSize(24);
          doc.setTextColor("#5c3d2e");
          doc.setFont("helvetica", "bold");
          doc.text("LOST PET!", 110, 40);
  
          doc.addImage(base64data, "PNG", 90, 60, 170, 130);
  
          doc.setFont("helvetica", "normal");
          doc.setFontSize(12);
          doc.setTextColor("#000");
  
          doc.text(`Pet Name: ${name}`, 30, 210);
          doc.text(`Last Seen: ${location}`, 30, 230);
          doc.text(`Contact: ${contact}`, 30, 250);
          doc.text("Details:", 30, 270);
          const lines = doc.splitTextToSize(description, 290);
          doc.text(lines, 30, 285);
  
          doc.setFillColor("#a0522d");
          doc.setTextColor("#fff");
          doc.roundedRect(200, 420, 110, 30, 5, 5, "F");
          doc.setFontSize(11);
          doc.text("REWARD OFFERED", 210, 440);
  
          doc.save(`${name}_LostPetPoster.pdf`);
        };
        reader.readAsDataURL(blob);
      });
  };
  

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
          <button onClick={generatePoster} className="download-btn">
                Download Poster
           </button>


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
