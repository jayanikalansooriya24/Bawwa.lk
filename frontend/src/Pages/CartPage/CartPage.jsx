import React, { useState } from "react";
import { useCart } from "../CartPage/CartContext";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const { cart, setCart } = useCart();
  const [selectedItems, setSelectedItems] = useState(cart.map((item) => item.file));
  const navigate = useNavigate();

  const removeItem = (file) => {
    setCart((prevCart) => prevCart.filter((item) => item.file !== file));
    setSelectedItems((prevSelected) => prevSelected.filter((item) => item !== file));
  };

  const updateQuantity = (file, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.file === file ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleItemSelection = (file) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(file)
        ? prevSelected.filter((item) => item !== file)
        : [...prevSelected, file]
    );
  };

  const totalPrice = cart
    .filter((item) => selectedItems.includes(item.file))
    .reduce((total, item) => total + item.price * item.quantity, 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={item.file} className="cart-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.file)}
                onChange={() => toggleItemSelection(item.file)}
                className="cart-checkbox"
              />
              <div className="cart-3d-model">
                <Canvas>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1.2} />
                  <OrbitControls enableZoom={false} enablePan={false} />
                  <AccessoryModel file={item.file} />
                </Canvas>
              </div>
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p className="cart-description">{item.description}</p>
                <p className="cart-price">Price: {formatPrice(item.price)}</p>
                <p className="cart-total">Total: {formatPrice(item.price * item.quantity)}</p>
                <div className="quantity-selector">
                  <button onClick={() => updateQuantity(item.file, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.file, item.quantity + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.file)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="payment-summary">
        <h3>Order Summary</h3>
        <p className="total-price">
          Total: <strong>{formatPrice(totalPrice)}</strong>
        </p>
        <button
          className="pay-now-btn"
          disabled={selectedItems.length === 0}
          onClick={() => navigate("/paymentPortal", { state: { total: totalPrice } })}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

const AccessoryModel = ({ file }) => {
  const { scene } = useGLTF(`/accessory/${file}`);
  return <primitive object={scene} scale={3} position={[0, -1, 0]} />;
};

export default CartPage;