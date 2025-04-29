import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NutrientPlans.css';

const NutrientPlans = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/nutrition');
        setNutritionData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch nutrition data');
        setLoading(false);
        console.error('Error fetching nutrition data:', err);
      }
    };

    fetchNutritionData();
  }, []);

  if (loading) return <div className="loading-state">Loading...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="nutrient-plans-container">
      <h1 className="nutrient-plans-title">Nutrition Plans</h1>
      <div className="nutrient-cards-container">
        {nutritionData.map((plan) => (
          <div key={plan._id} className="nutrient-card">
            <div className="nutrient-card-header">
              <h3 className="nutrient-card-title">{plan.foodName}</h3>
              <span className="nutrient-card-pet-id">Pet ID: {plan.petId}</span>
            </div>
            <div className="nutrient-card-details">
              <div className="nutrient-card-detail">
                <span className="nutrient-card-label">Portion Size</span>
                <span className="nutrient-card-value">{plan.portionSize}g</span>
              </div>
              <div className="nutrient-card-detail">
                <span className="nutrient-card-label">Feeding Frequency</span>
                <span className="nutrient-card-value">{plan.feedingFrequency}</span>
              </div>
            </div>
            <div className="nutrient-card-calories">
              <span className="nutrient-card-calories-label">Calories</span>
              <span className="nutrient-card-calories-value">{plan.calories} kcal</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutrientPlans;