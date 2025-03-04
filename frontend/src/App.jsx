import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/navbar/navbar";
import Footer from "./Components/footer/footer";
import Register from "./Pages/Registration/Register";
import Feedback from "./Pages/Feedback/feedback";
import Userprofile from "./Pages/Userprofile/userprofile";  

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feedback" element={<Feedback />} /> {/* Add Feedback Route */}
          <Route path="/userprofile" element={<Userprofile />} /> {/* Add User Profile Route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
