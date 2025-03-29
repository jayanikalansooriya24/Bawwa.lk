import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/navbar/navbar";
import Footer from "./Components/footer/footer";
import PetDietPlans from "./Pages/PetDietPlans/PetDietPlans";
import NutrientCalculator from "./Pages/NutrientCalculator/NutrientCalculator";
import RecipeSuggestions from "./Pages/RecipeSuggestions/RecipeSuggestions";
import NutritionManagement from "./Pages/NutritionManagement/NutritionManagement";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PetDietPlans" element={<PetDietPlans/>} />  
          <Route path="/NutrientCalculator" element={<NutrientCalculator/>} /> 
          <Route path="/RecipeSuggestions" element={<RecipeSuggestions/>} />
          <Route path="/NutritionManagement" element={<NutritionManagement/>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
