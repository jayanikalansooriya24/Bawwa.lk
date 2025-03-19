import React, { useState } from "react";
import moment from "moment";
import "./Vaccination.css"; // Import the external CSS file

const Vaccination = () => {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [vaccinationSchedule, setVaccinationSchedule] = useState([]);

  // Common vaccination schedules (weeks after birth)
  const schedules = {
    dog: [
      { name: "DHPP (Distemper, Hepatitis, Parvo, Parainfluenza)", weeks: 6 },
      { name: "DHPP Booster", weeks: 10 },
      { name: "Rabies", weeks: 12 },
      { name: "Leptospirosis", weeks: 14 },
      { name: "Annual Booster", weeks: 52 }, // 1 year
    ],
    cat: [
      { name: "FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)", weeks: 6 },
      { name: "FVRCP Booster", weeks: 10 },
      { name: "Rabies", weeks: 12 },
      { name: "FeLV (Feline Leukemia)", weeks: 14 },
      { name: "Annual Booster", weeks: 52 }, // 1 year
    ],
  };

  const calculateVaccinationSchedule = () => {
    if (!birthdate || !petType) {
      alert("Please enter birthdate and select pet type.");
      return;
    }

    const birthMoment = moment(birthdate);
    const now = moment();

    const schedule = schedules[petType].map((vaccine) => {
      const vaccineDate = birthMoment.clone().add(vaccine.weeks, "weeks");
      return {
        ...vaccine,
        date: vaccineDate.format("YYYY-MM-DD"),
        status: vaccineDate.isBefore(now) ? "Completed" : "Upcoming",
      };
    });

    setVaccinationSchedule(schedule);
  };

  return (
    <div className="vaccination-container">
      <h2 className="title">Pet Vaccination Calculator</h2>

      <div className="input-group">
        <label>Pet Name:</label>
        <input
          type="text"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          placeholder="Enter pet's name"
        />
      </div>

      <div className="input-group">
        <label>Pet Type:</label>
        <select value={petType} onChange={(e) => setPetType(e.target.value)}>
          <option value="">Select Pet Type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
      </div>

      <div className="input-group">
        <label>Pet's Birthdate:</label>
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </div>

      <button className="calculate-btn" onClick={calculateVaccinationSchedule}>
        Calculate Vaccination Schedule
      </button>

      {vaccinationSchedule.length > 0 && (
        <div className="schedule">
          <h3>Vaccination Schedule</h3>
          <ul>
            {vaccinationSchedule.map((vaccine, index) => (
              <li key={index} className={vaccine.status === "Completed" ? "completed" : "upcoming"}>
                <strong>{vaccine.name}</strong> - {vaccine.date} - 
                <span className={vaccine.status === "Completed" ? "text-gray" : "text-green"}>
                  {vaccine.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Vaccination;
