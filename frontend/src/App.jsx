import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/navbar/Navbar";
import Footer from "./Components/footer/Footer";
import Register from "./Pages/Registration/Register";
import Feedback from "./Pages/Feedback/Feedback";
import UserProfile from "./Pages/Userprofile/UserProfile";
import LostPet from "./Pages/Lostpet/LostPet";
import { StoreProvider } from "./context/StoreContext";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/lostpet" element={<LostPet />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </StoreProvider>
  );
}

export default App;
