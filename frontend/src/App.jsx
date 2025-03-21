import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/navbar/navbar";
import Footer from "./Components/footer/footer";
import { PetModel } from "./Pages/PetModel/PetModel";
import PetAccessories from "./Pages/PetAccessories/PetAccessories";
import CartPage from "./Pages/CartPage/CartPage";

function App() {
  const [cart, setCart] = useState([]); // Manage cart state here

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PetModel" element={<PetModel pet="dog" setCart={setCart} />} />
          <Route
            path="/cart"
            element={<CartPage cart={cart} setCart={setCart} />} // Pass cart state to CartPage
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
