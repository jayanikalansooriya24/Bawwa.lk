import React, { useState } from 'react';
import './NutrientCalculator.css';

const NutrientCalculator = () => {
  const [petType, setPetType] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [nutrients, setNutrients] = useState(null);

  const handlePetTypeChange = (e) => setPetType(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);
  const handleWeightChange = (e) => setWeight(e.target.value);

  const calculateNutrients = (type, age, weight) => {
    let protein, carbohydrates, fat, fiber;
    
    if (type.toLowerCase() === 'dog') {
      protein = weight * 2.5;
      carbohydrates = weight * 5;
      fat = weight * 1.2;
      fiber = weight * 0.5;
    } else {
      protein = weight * 2.0;
      carbohydrates = weight * 4.5;
      fat = weight * 1.0;
      fiber = weight * 0.4;
    }
    
    return { protein, carbohydrates, fat, fiber };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nutrientValues = calculateNutrients(petType, parseFloat(age), parseFloat(weight));
    setNutrients(nutrientValues);
  };

  return (
    <div className="nutrient-calculator-container">
      <div className="nutrient-calculator">
        <h2>Nutrient Calculator</h2>
        <form onSubmit={handleSubmit}>
          <label>Pet Type:</label>
          <input type="text" value={petType} onChange={handlePetTypeChange} required />

          <label>Age (in years):</label>
          <input type="number" value={age} onChange={handleAgeChange} required />

          <label>Weight (in kg):</label>
          <input type="number" value={weight} onChange={handleWeightChange} required />

          <button type="submit">Calculate</button>
        </form>
      </div>
      {nutrients && (
        <div className="nutrient-results">
          <h3>Nutrition Breakdown</h3>
          <p>Protein: {nutrients.protein.toFixed(2)} g</p>
          <p>Carbohydrates: {nutrients.carbohydrates.toFixed(2)} g</p>
          <p>Fat: {nutrients.fat.toFixed(2)} g</p>
          <p>Fiber: {nutrients.fiber.toFixed(2)} g</p>
        </div>
      )}
    </div>
  );
};

export default NutrientCalculator;
