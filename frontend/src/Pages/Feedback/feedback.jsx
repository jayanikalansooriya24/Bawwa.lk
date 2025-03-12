import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    feedbackType: "Service Experience",
    details: "",
    rating: 0,
    suggestions: "",
    file: null,
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleRating = (rate) => {
    setFormData({ ...formData, rating: rate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    alert("Thank you for your feedback!");
  };

  return (
    <div>
      <h2>Share Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone (Optional)"
          value={formData.phone}
          onChange={handleChange}
        />
        <select name="feedbackType" value={formData.feedbackType} onChange={handleChange}>
          <option>Service Experience</option>
          <option>Website Usability</option>
          <option>Veterinarian Consultation</option>
          <option>Pet Grooming & Care</option>
          <option>Customer Support</option>
          <option>Other</option>
        </select>
        <textarea
          name="details"
          placeholder="Tell us about your experience..."
          value={formData.details}
          onChange={handleChange}
        ></textarea>

        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => handleRating(star)}
              style={{ cursor: "pointer", color: star <= formData.rating ? "gold" : "gray" }}
            />
          ))}
        </div>

        <textarea
          name="suggestions"
          placeholder="What can we improve?"
          value={formData.suggestions}
          onChange={handleChange}
        ></textarea>

        <input type="file" name="file" onChange={handleChange} />

        <div>
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
          />
          <label>I agree to allow Bawwalk to use my feedback for improvements.</label>
        </div>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
