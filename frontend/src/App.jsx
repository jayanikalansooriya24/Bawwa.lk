import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/navbar/navbar";
import Footer from "./Components/footer/footer";
import { PetModel } from "./Pages/PetModel/PetModel";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PetModel" element={<PetModel pet="dog"/>}/>
     
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;