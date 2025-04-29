import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/navbar/navbar";
import Footer from "./Components/footer/footer";
import PetDietPlans from "./Pages/PetDietPlans/PetDietPlans";
import NutrientCalculator from "./Pages/NutrientCalculator/NutrientCalculator";
import RecipeSuggestions from "./Pages/RecipeSuggestions/RecipeSuggestions";
import NutritionManagement from "./Pages/NutritionManagement/NutritionManagement";
import Services from "./Pages/Services/Services";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Team from "./Pages/Team/Team";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import NutrientPlans from "./Pages/NutrientPlans/NutrientPlans";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Services" element={<Services/>} />
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/Team" element={<Team/>} />
          <Route path="/PetDietPlans" element={<PetDietPlans/>} />
          <Route path="/NutrientCalculator" element={<NutrientCalculator/>} /> 
          <Route path="/RecipeSuggestions" element={<RecipeSuggestions/>} />
          <Route path="/NutritionManagement" element={<NutritionManagement/>} />
          <Route path="/AdminDashboard" element={<AdminDashboard/>} />
          <Route path="/nutrientplans" element={<NutrientPlans/>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
