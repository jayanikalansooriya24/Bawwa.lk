import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/navbar/navbar";
import Footer from "./Components/footer/footer";
import Register from "./Pages/Registration/Register"; // Make sure the path matches your folder structure

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} /> {/* Add this route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
