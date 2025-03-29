import React, { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useNavigate } from "react-router-dom"; 
import { useCart } from "../CartPage/CartContext"; 
import "./PetAccessories.css";

const accessoryData = {
  dog: [
    { name: "Dog Collar 1", file: "Dog_Collar_2.glb", description: "Durable leather collar with adjustable buckle.", price: 2500.99 },
    { name: "Dog Collar 2", file: "Dog_Collar_1.glb", description: "Classic red nylon collar for extra comfort.", price: 3000.99 },
    { name: "Dog Collar 3", file: "Red_Bow_Collar_.glb", description: "Stylish red bow collar for a fancy look.", price: 1500.99 },
  ],
  cat: [
    { name: "Cat Collar 1", file: "Cat_Collar_1.glb", description: "Soft velvet collar with a tiny bell.", price: 2500.99 },
    { name: "Pink Leather Collar", file: "Pink_Leather_Cat_Coll_.glb", description: "Premium pink leather with gold buckle.", price: 2300.99 },
    { name: "Purple Bow Collar", file: "Purple_Bow_Collar_.glb", description: "Elegant purple bow collar for style.", price: 3200.99 }
  ]
};

const PetAccessories = ({ selectedPet }) => {
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Selected Pet:", selectedPet);
  }, [selectedPet]);

  if (!selectedPet) {
    return <div className="error">No pet selected. Please choose a pet.</div>;
  }

  const accessories = [...(accessoryData[selectedPet] || [])];

  const handleAddToCart = () => {
    if (selectedAccessory) {
      const item = { ...selectedAccessory, quantity };
      addToCart(item);
      setDialogOpen(false);
      setQuantity(1);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/cart");
      }, 2000);
    }
  };

  return (
    <div className="accessory-container">
      <h2>Groom Your Pet {selectedPet.charAt(0).toUpperCase() + selectedPet.slice(1)}</h2>
      <div className="accessory-list">
        {accessories.map((accessory) => (
          <AccessoryItem
            key={accessory.file}
            accessory={accessory}
            isSelected={selectedAccessory?.file === accessory.file}
            onSelect={() => setSelectedAccessory(accessory)}
            onAddToCart={() => {
              setSelectedAccessory(accessory);
              setDialogOpen(true);
            }}
          />
        ))}
      </div>

      {isDialogOpen && selectedAccessory && (
        <>
          <div className="dialog-overlay" onClick={() => setDialogOpen(false)}></div>
          <div className="dialog-box">
            <button className="close-btn" onClick={() => setDialogOpen(false)}>✖</button>
            <h3>{selectedAccessory.name}</h3>
            <p>{selectedAccessory.description}</p>
            <p className="accessory-price">
  Total: {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(selectedAccessory.price * quantity)}
</p>


            <div className="accessory-preview">
              <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <OrbitControls />
                <AccessoryModel file={selectedAccessory.file} />
              </Canvas>
            </div>

            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button className="add-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            <button className="cancel-btn" onClick={() => setDialogOpen(false)}>Cancel</button>
          </div>
        </>
      )}

      {showPopup && (
        <AddToCartPopup message={`${selectedAccessory?.name} has been added to your cart!`} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

const AccessoryItem = ({ accessory, isSelected, onSelect, onAddToCart }) => {
  return (
    <div className={`accessory-item ${isSelected ? "selected" : ""}`}>
      <h3>{accessory.name}</h3>
      <p>{accessory.description}</p>
      <p className="accessory-price">LKR {accessory.price.toFixed(2)}</p>
      <div className="accessory-display">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls />
          <AccessoryModel file={accessory.file} />
        </Canvas>
      </div>
      <div className="accessory-buttons">
        <button className={`select-button ${isSelected ? "active" : ""}`} onClick={onSelect}>
          {isSelected ? "Selected" : "Select"}
        </button>
        <button className="cart-button" onClick={onAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

const AccessoryModel = ({ file }) => {
  const { scene } = useGLTF(`/accessory/${file}`);
  return <primitive object={scene} scale={3} position={[0, -1, 0]} />;
};

const AddToCartPopup = ({ message, onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-message">
        <p>{message}</p>
        <button className="close-popup" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default PetAccessories;