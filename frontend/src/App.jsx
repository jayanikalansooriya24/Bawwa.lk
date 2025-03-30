import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import PetImageTo3D from "./Pages/PetImageConverter/PetImageTo3D ";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";

// Create a Layout component to conditionally render Navbar and Footer
const MainLayout = ({ children }) => {
  const location = useLocation(); // Get the current route
  const isAdminRoute = location.pathname === "/admin"; // Check if it's the admin route

  return (
    <>
      {!isAdminRoute && <Navbar />} {/* Render Navbar only for non-admin routes */}
      <div className="content">{children}</div>
      {!isAdminRoute && <Footer />} {/* Render Footer only for non-admin routes */}
    </>
  );
};

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <CartProvider>
        <Router>
          <Routes>
            {/* Wrap non-admin routes in MainLayout */}
            <Route
              path="/*"
              element={
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/PetModel" element={<PetModel pet="dog" />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/paymentPortal" element={<PaymentPortal />} />
                    <Route path="/petimage3D" element={<PetImageTo3D />} />
                    <Route path="/PetAccessories" element={<PetAccessories />} />
                  </Routes>
                </MainLayout>
              }
            />
            {/* Admin route without MainLayout */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </CartProvider>
    </DndProvider>
  );
}

export default App;