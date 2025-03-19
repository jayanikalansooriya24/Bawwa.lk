import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Booknow from "./Pages/Booknow/Booknow";
import Mybooking from "./Pages/Mybooking/Mybooking";
import Vaccination from "./Pages/VaccinationCal/Vaccination"; // Import Vaccination Page

import Navbar from "./Components/navbar/navbar";
import Footer from "./Components/footer/footer";

function App() {
  return (
    <Router>
      
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booknow" element={<Booknow />} />
          <Route path="/mybookings" element={<Mybooking />} /> {/* New route */}
          <Route path="/vaccination" element={<Vaccination />} /> {/* New Route */}
          
         
        </Routes>
      </div>
     
    </Router>
  );
}

export default App;
