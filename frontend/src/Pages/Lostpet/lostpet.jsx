import React, { useState } from "react";
import "./lostpet.css";

const LostPet = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Report a Lost Pet</h1>
        
        {/* Image Upload */}
        <div className="mb-4">
          {image && <img src={image} alt="Lost Pet" className="w-full h-64 object-cover rounded-md mb-4" />}
          <label className="block text-gray-700 font-medium mb-2">Upload Pet Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-md" />
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Pet Name</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter pet's name" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Last Seen Location</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter last known location" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Contact Information</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your contact details" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea className="w-full p-2 border rounded-md" rows="4" placeholder="Provide additional details"></textarea>
          </div>

          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default LostPet;
