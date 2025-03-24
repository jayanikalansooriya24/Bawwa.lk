import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from "./Pages/Home/Home";
import Navbar from "./Components/navbar/navbar";
import Footer from "./Components/footer/footer";
import { PetModel } from "./Pages/PetModel/PetModel";
import PetAccessories from "./Pages/PetAccessories/PetAccessories";
import CartPage from "./Pages/CartPage/CartPage";
import { CartProvider } from "./Pages/CartPage/CartContext";
import PaymentPortal from "./Pages/PaymentPortal/PaymentPortal";

function App() {
  return (
    <DndProvider backend={HTML5Backend}> 
    <CartProvider>
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PetModel" element={<PetModel pet="dog" />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/paymentPortal" element={<PaymentPortal/>}/>
          </Routes>
        </div>
        <Footer />
      </Router>
    </CartProvider>
    </DndProvider>
  );
}

export default App;
