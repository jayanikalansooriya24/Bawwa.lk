import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import "../CartPage/CartPage.css";

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleDeleteItem = (itemToDelete) => {
    setCart(cart.filter((item) => item !== itemToDelete));
  };

  const handleIncreaseQuantity = (item) => {
    setCart(
      cart.map((cartItem) =>
        cartItem === item
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      setCart(
        cart.map((cartItem) =>
          cartItem === item
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  // Safeguard against undefined or null cart
  if (!Array.isArray(cart) || cart.length === 0) {
    return <div className="empty-cart">Your cart is empty.</div>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.file} className="cart-item">
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="cart-item-quantity">
                <button
                  className="quantity-btn"
                  onClick={() => handleDecreaseQuantity(item)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleIncreaseQuantity(item)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="cart-item-preview">
              <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <OrbitControls />
                <AccessoryModel file={item.file} />
              </Canvas>
            </div>
            <button
              className="delete-item-btn"
              onClick={() => handleDeleteItem(item)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="cart-actions">
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          Checkout
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
