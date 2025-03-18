import React, { useState, useRef, useContext } from "react";
import { Dog, Cat, Upload, X, Venus, Mars } from "lucide-react";
import { FaUser, FaPaw, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";
import bgImage from "../../assets/1.png";  // Ensure the image is inside `src/assets/`
import "./Register.css"; // Link to external CSS file
import { StoreContext } from "../../context/StoreContext";

const Register = () => {
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);

  const {url} = useContext(StoreContext);

  const [formData, setFormData] = useState({
    user: { firstName: "", lastName: "", email: "", phone: "" },
    pet: { name: "", type: "", breed: "", age: "", gender: "", birthdate: "", medicalConditions: "", image: null }
  });

  const [errors, setErrors] = useState({});

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      user: { ...prev.user, [name]: value }
    }));
  };

  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      pet: { ...prev.pet, [name]: value }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData((prev) => ({
          ...prev,
          pet: { ...prev.pet, image: reader.result }
        }));
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      pet: { ...prev.pet, image: null }
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.user.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.user.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.user.email.trim() || !/\S+@\S+\.\S+/.test(formData.user.email)) newErrors.email = "Valid email is required";
    if (!formData.user.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.pet.name.trim()) newErrors.petName = "Pet name is required";
    if (!formData.pet.breed.trim()) newErrors.petBreed = "Pet breed is required";
    if (!formData.pet.age.trim()) newErrors.petAge = "Pet age is required";
    if (!formData.pet.gender) newErrors.petGender = "Pet gender is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post("http://localhost:5000/api/user/register", {
        firstName: formData.user.firstName,
        lastName: formData.user.lastName,
        email: formData.user.email,
        phone: formData.user.phone,
        password: formData.user.password, // Sending password as required by backend
        pet: {
          name: formData.pet.name,
          type: formData.pet.type,
          breed: formData.pet.breed,
          age: formData.pet.age,
          gender: formData.pet.gender,
          birthdate: formData.pet.birthdate,
          medicalConditions: formData.pet.medicalConditions,
          image: formData.pet.image
        }
      });

      setMessage(response.data.message);
      alert("Registration Successful!");
      setStep(1);
      setFormData({
        user: { firstName: "", lastName: "", email: "", phone: "", password: "" },
        pet: { name: "", type: "", breed: "", age: "", gender: "", birthdate: "", medicalConditions: "", image: null }
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const petTypes = [
    { value: "dog", label: "Dog", icon: Dog },
    { value: "cat", label: "Cat", icon: Cat }
  ];

  const genderOptions = [
    { value: "male", label: "Male", icon: Mars },
    { value: "female", label: "Female", icon: Venus }
  ];

  

  return (

    <div className="register-background">
      <div className="register-container">
      <h1>Login</h1>
        {step === 1 && (
          <form className="form-container">
            <h2><FaUser /> Owner Information</h2>
            <div className="input-row">
  <div>
    <input type="text" name="firstName" value={formData.user.firstName} onChange={handleUserChange} placeholder="First Name" />
    {errors.firstName && <p className="error">{errors.firstName}</p>}
  </div>
  <div>
    <input type="text" name="lastName" value={formData.user.lastName} onChange={handleUserChange} placeholder="Last Name" />
    {errors.lastName && <p className="error">{errors.lastName}</p>}
  </div>
</div>
<div className="input-row">
  <div>
    <input type="email" name="email" value={formData.user.email} onChange={handleUserChange} placeholder="Email" />
    {errors.email && <p className="error">{errors.email}</p>}
  </div>
  <div>
    <input type="tel" name="phone" value={formData.user.phone} onChange={handleUserChange} placeholder="Phone Number" />
    {errors.phone && <p className="error">{errors.phone}</p>}
  </div>
</div>

            <button type="button" onClick={nextStep}>Next: Pet Details</button>
          </form>
        )}

        {step === 2 && (
          <form className="form-container">
            <h2><FaPaw /> Pet Information</h2>
            <input type="text" name="name" value={formData.pet.name} onChange={handlePetChange} placeholder="Pet Name" />
{errors.petName && <p className="error">{errors.petName}</p>}

<input type="text" name="breed" value={formData.pet.breed} onChange={handlePetChange} placeholder="Breed" />
{errors.petBreed && <p className="error">{errors.petBreed}</p>}

<input type="text" name="age" value={formData.pet.age} onChange={handlePetChange} placeholder="Age (if birthdate unknown)" />
{errors.petAge && <p className="error">{errors.petAge}</p>}

<h3>Select Gender</h3>
<div className="gender-container">
  {genderOptions.map(({ value, label, icon: Icon }) => (
    <button key={value} type="button" onClick={() => setFormData((prev) => ({ ...prev, pet: { ...prev.pet, gender: value } }))} className={`gender-button ${formData.pet.gender === value ? "active" : ""}`}>
      <Icon /> {label}
    </button>
  ))}
</div>
{errors.petGender && <p className="error">{errors.petGender}</p>}

            <h3>Select Pet Type</h3>
            <div className="pet-type-container">
              {petTypes.map(({ value, label, icon: Icon }) => (
                <button key={value} type="button" onClick={() => setFormData((prev) => ({ ...prev, pet: { ...prev.pet, type: value } }))} className={`pet-type-button ${formData.pet.type === value ? "active" : ""}`}>
                  <Icon /> {label}
                </button>
              ))}
            </div>

            

            <h3>Upload Pet Image</h3>
            <label className="upload-label">
              <Upload /> Upload Image
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} hidden />
            </label>
            {formData.pet.image && <img src={formData.pet.image} alt="Pet" />}
            {formData.pet.image && <button type="button" onClick={removeImage}><X /> Remove Image</button>}

            <button type="button" onClick={nextStep}>Next: Review</button>
            <button type="button" onClick={prevStep}>Back</button>
          </form>
        )}

        {step === 3 && (
          <div className="review-container">
            <h2>Review Your Information</h2>
            <p><strong>User:</strong>Nmae - {formData.user.firstName} {formData.user.lastName} <br></br>Email- {formData.user.email} <br></br>Tele no -  {formData.user.phone}</p>
            <p><strong>Pet:</strong> Name - {formData.pet.name} <br></br> Birthday -{formData.pet.birthdate}<br></br>Breed - {formData.pet.breed}<br></br> Age - {formData.pet.age} </p>
            {formData.pet.image && <img src={formData.pet.image} alt="Pet" />}
            <button type="button" onClick={() => alert("Registration Complete!")}>Complete Registration</button>
            <button type="button" onClick={prevStep}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
