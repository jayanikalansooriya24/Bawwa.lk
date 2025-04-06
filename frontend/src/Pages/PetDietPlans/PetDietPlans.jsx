// src/components/PetDietPlans.js
import React, { useState } from 'react';
import './PetDietPlans.css';

const PetDietPlans = () => {
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [petName, setPetName] = useState('');
  const [showDietDialog, setShowDietDialog] = useState(false);

  const handleSpeciesChange = (e) => setSpecies(e.target.value);
  const handleBreedChange = (e) => setBreed(e.target.value);
  
  const handlePetNameChange = (e) => {
    const value = e.target.value;
    // Only allow A-Z and a-z
    if (/^[A-Za-z]*$/.test(value)) {
      setPetName(value);
    }
  };

  const getDietPlan = () => {
    // Basic diet plan suggestion based on species (this is a simple example)
    if (species.toLowerCase().includes('german shepherd')) {
      return {
        food: 'High-quality dry kibble with meat protein',
        amount: '2-3 cups daily',
        frequency: 'Twice a day',
        notes: 'Include lean meat supplements and vegetables'
      };
    }
    return {
      food: 'General pet food',
      amount: '1-2 cups daily',
      frequency: 'Once or twice a day',
      notes: 'Consult vet for specific needs'
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDietDialog(true);
  };

  const closeDialog = () => {
    setShowDietDialog(false);
  };

  return (
    <div className="pet-diet-plans">
      <br></br><br></br><br></br><br></br>
      <h2>Pet Diet Plans</h2>
      <form onSubmit={handleSubmit}>
        <label>Pet Name:</label>
        <input
          type="text"
          value={petName}
          onChange={handlePetNameChange}
          pattern="[A-Za-z]+"
          title="Please use only letters (A-Z or a-z)"
          required
        />

        <label>Species:</label>
        <input
          type="text"
          value={species}
          onChange={handleSpeciesChange}
          required
        />
        
        <label>Breed:</label>
        <input
          type="text"
          value={breed}
          onChange={handleBreedChange}
          required
        />
        
        <button type="submit">Get Diet Plan</button>
      </form>

      {showDietDialog && (
        <div className="diet-dialog">
          <div className="diet-dialog-content">
            <h3>Diet Plan for {petName}</h3>
            <p><strong>Species:</strong> {species}</p>
            <p><strong>Breed:</strong> {breed}</p>
            <h4>Recommended Diet:</h4>
            <p><strong>Food:</strong> {getDietPlan().food}</p>
            <p><strong>Amount:</strong> {getDietPlan().amount}</p>
            <p><strong>Frequency:</strong> {getDietPlan().frequency}</p>
            <p><strong>Notes:</strong> {getDietPlan().notes}</p>
            <button onClick={closeDialog}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDietPlans;