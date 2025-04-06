// Services.jsx (Updated)
import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";
// Import images (adjust paths according to your project structure)
import groomingImg from "../../assets/grooming.png";
import trainingImg from "../../assets/training.png";
import boardingImg from "../../assets/boarding.png";
import lostPetImg from "../../assets/lostpets.png";
import vetCareImg from "../../assets/vet.png";
import vaccinationImg from "../../assets/vacical.png";

const Services = () => {
  const services = [
    {
      title: "Grooming",
      path: "/services/grooming",
      description: "Professional grooming services for your pets",
      image: groomingImg,
    },
    {
      title: "Training",
      path: "/services/training",
      description: "Expert training programs for all pet ages",
      image: trainingImg,
    },
    {
      title: "Pet Boarding",
      path: "/services/boarding",
      description: "Safe and comfortable boarding facilities",
      image: boardingImg,
    },
    {
      title: "Lost Pet",
      path: "/services/lostpet",
      description: "Helping you find your lost companions",
      image: lostPetImg,
    },
    {
      title: "Veterinary Care",
      path: "/services/veterinary",
      description: "Comprehensive health care services",
      image: vetCareImg,
    },
    {
      title: "Vaccination Calculator",
      path: "/services/vaccinationcal",
      description: "Plan your pet's vaccination schedule",
      image: vaccinationImg,
    },
  ];

  return (
    <div className="services-page">
      <h1 className="services-title">Our Services</h1>
      <div className="services-container">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <img src={service.image} alt={service.title} className="service-image" />
            <div className="service-content">
              <h2 className="service-title">{service.title}</h2>
              <p className="service-description">{service.description}</p>
              <Link to={service.path} className="service-link">
                Get Here
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;