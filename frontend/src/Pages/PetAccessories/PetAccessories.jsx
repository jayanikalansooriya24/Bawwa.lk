import React, { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartPage/CartContext';
import axios from 'axios';
import './PetAccessories.css';

const PetAccessories = ({ selectedPet }) => {
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [accessories, setAccessories] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/accessories');
        const filteredAccessories = response.data.filter(
          (accessory) => accessory.petType === selectedPet
        );
        setAccessories(filteredAccessories);
      } catch (error) {
        console.error('Error fetching accessories:', error);
      }
    };
    if (selectedPet) {
      fetchAccessories();
    }
  }, [selectedPet]);

  if (!selectedPet) {
    return <div className="error">No pet selected. Please choose a pet.</div>;
  }

  const handleAddToCart = () => {
    if (selectedAccessory) {
      const item = {
        _id: selectedAccessory._id,
        name: selectedAccessory.name,
        description: selectedAccessory.description,
        price: selectedAccessory.price,
        file: selectedAccessory.filePath.split('/').pop(),
        quantity,
      };
      addToCart(item);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setDialogOpen(false);
        setQuantity(1);
        navigate('/cart');
      }, 2000); // Show success animation for 2 seconds
    }
  };

  return (
    <div className="accessory-container">
      <h2>Groom Your {selectedPet.charAt(0).toUpperCase() + selectedPet.slice(1)}</h2>
      <div className="accessory-list">
        {accessories.length > 0 ? (
          accessories.map((accessory) => (
            <AccessoryItem
              key={accessory._id}
              accessory={accessory}
              isSelected={selectedAccessory?._id === accessory._id}
              onSelect={() => setSelectedAccessory(accessory)}
              onAddToCart={() => {
                setSelectedAccessory(accessory);
                setDialogOpen(true);
              }}
            />
          ))
        ) : (
          <p>No accessories available for {selectedPet}.</p>
        )}
      </div>

      {isDialogOpen && selectedAccessory && (
        <>
          <div className="dialog-overlay" onClick={() => setDialogOpen(false)}></div>
          <div className={`dialog-box ${showSuccess ? 'success' : ''}`}>
            <button className="close-btn" onClick={() => setDialogOpen(false)}>✖</button>
            {!showSuccess ? (
              <>
                <h3>{selectedAccessory.name}</h3>
                <p>{selectedAccessory.description}</p>
                <p className="accessory-price">
                  Total:{' '}
                  {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(
                    selectedAccessory.price * quantity
                  )}
                </p>
                <div className="accessory-preview">
                  <Canvas>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <OrbitControls />
                    <AccessoryModel file={selectedAccessory.filePath} />
                  </Canvas>
                </div>
                <div className="quantity-selector">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button className="add-cart-btn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button className="cancel-btn" onClick={() => setDialogOpen(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <div className="success-animation">
                <svg className="checkmark" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
                <p>Added to Cart Successfully!</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const AccessoryItem = ({ accessory, isSelected, onSelect, onAddToCart }) => {
  return (
    <div className={`accessory-item ${isSelected ? 'selected' : ''}`}>
      <h3>{accessory.name}</h3>
      <p>{accessory.description}</p>
      <p className="accessory-price">LKR {accessory.price.toFixed(2)}</p>
      <div className="accessory-display">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls />
          <AccessoryModel file={accessory.filePath} />
        </Canvas>
      </div>
      <div className="accessory-buttons">
        <button
          className={`select-button ${isSelected ? 'active' : ''}`}
          onClick={onSelect}
        >
          {isSelected ? 'Selected' : 'Select'}
        </button>
        <button className="cart-button" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const AccessoryModel = ({ file }) => {
  const { scene } = useGLTF(`http://localhost:5000${file}`);
  return <primitive object={scene} scale={3} position={[0, -1, 0]} />;
};

export default PetAccessories;