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

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.details.trim()) {
      newErrors.details = "Details are required";
    } else if (formData.details.length < 10) {
      newErrors.details = "Details must be at least 10 characters";
    }

    if (formData.rating === 0) {
      newErrors.rating = "Please provide a rating";
    }

    if (!formData.consent) {
      newErrors.consent = "You must agree to allow us to use your feedback";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (validate()) {
      console.log("Feedback submitted:", formData);
      alert("Thank you for your feedback!");
      setFormData({
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
      setErrors({});
    }
  };

  return (
    <div>
      <div className="container">
      <h2>Share Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        {/* Phone (Optional) */}
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone (Optional)"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        {/* Feedback Type */}
        <select name="feedbackType" value={formData.feedbackType} onChange={handleChange}>
          <option>Service Experience</option>
          <option>Website Usability</option>
          <option>Veterinarian Consultation</option>
          <option>Pet Grooming & Care</option>
          <option>Customer Support</option>
          <option>Other</option>
        </select>

        {/* Details */}
        <textarea
          name="details"
          placeholder="Tell us about your experience..."
          value={formData.details}
          onChange={handleChange}
        ></textarea>
        {errors.details && <p className="error">{errors.details}</p>}

        {/* Star Rating */}
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => handleRating(star)}
              style={{ cursor: "pointer", color: star <= formData.rating ? "gold" : "gray" }}
            />
          ))}
        </div>
        {errors.rating && <p className="error">{errors.rating}</p>}

        {/* Suggestions */}
        <textarea
          name="suggestions"
          placeholder="What can we improve?"
          value={formData.suggestions}
          onChange={handleChange}
        ></textarea>

        {/* File Upload */}
        <input type="file" name="file" onChange={handleChange} />

        {/* Consent Checkbox */}
        <div>
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
          />
          <label>I agree to allow Bawwalk to use my feedback for improvements.</label>
        </div>
        {errors.consent && <p className="error">{errors.consent}</p>}

        {/* Submit Button */}
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
    </div>
  );
};

export default Feedback;
