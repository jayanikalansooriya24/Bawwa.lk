// src/components/RecipeSuggestions.js
import React, { useState } from 'react';
import './RecipeSuggestions.css';

const RecipeSuggestions = () => {
  const [petType, setPetType] = useState('');
  const [dietType, setDietType] = useState('');
  const [recipe, setRecipe] = useState('');

  const handlePetTypeChange = (e) => setPetType(e.target.value);
  const handleDietTypeChange = (e) => setDietType(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    let recipeSuggestion = '';
    
    // Suggest recipes based on pet type and diet type
    if (petType === 'Dog') {
      switch (dietType) {
        case 'weight-loss':
          recipeSuggestion = 'Lean Turkey and Brown Rice with Steamed Carrots';
          break;
        case 'muscle-gain':
          recipeSuggestion = 'Chicken and Sweet Potato Power Bowl';
          break;
        case 'allergies':
          recipeSuggestion = 'Hypoallergenic Salmon with Pumpkin Puree';
          break;
        default:
          recipeSuggestion = 'Please select a diet type';
      }
    } else if (petType === 'Cat') {
      switch (dietType) {
        case 'weight-loss':
          recipeSuggestion = 'Low-Calorie Tuna and Zucchini Mix';
          break;
        case 'muscle-gain':
          recipeSuggestion = 'Protein-Rich Chicken and Egg Scramble';
          break;
        case 'allergies':
          recipeSuggestion = 'Allergy-Friendly Turkey and Pea Blend';
          break;
        default:
          recipeSuggestion = 'Please select a diet type';
      }
    } else if (petType === 'Rabbit') {
      switch (dietType) {
        case 'weight-loss':
          recipeSuggestion = 'Timothy Hay with Limited Pellets';
          break;
        case 'muscle-gain':
          recipeSuggestion = 'High-Fiber Hay Mix with Oat Supplement';
          break;
        case 'allergies':
          recipeSuggestion = 'Organic Hay with Hypoallergenic Herbs';
          break;
        default:
          recipeSuggestion = 'Please select a diet type';
      }
    } else {
      recipeSuggestion = 'Please select a pet type';
    }

    setRecipe(recipeSuggestion);
  };

  return (
    <div className="recipe-suggestions">
      <br/><br/><br/>
      <h2>Recipe Suggestions</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pet Type:</label>
          <br></br>
          <select value={petType} onChange={handlePetTypeChange} required>
            <option value="">Select a Pet</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
          </select>
        </div>

        <div>
          <label>Diet Type:</label>
          <br></br>
          <select value={dietType} onChange={handleDietTypeChange} required>
            <option value="">Select a diet</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="allergies">Allergies</option>
          </select>
        </div>

        <button type="submit">Get Recipe</button>
      </form>

      {recipe && (
        <div className="recipe-dialog">
          <h3>Suggested Recipe:</h3>
          <p>{recipe}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeSuggestions;