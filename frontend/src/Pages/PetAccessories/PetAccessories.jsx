import React, { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./PetAccessories.css";

const accessoryData = {
  dog: [
    { name: "Dog Collar 1", file: "Dog_Collar_2.glb", description: "Durable leather collar with adjustable buckle."},
    { name: "Dog Collar 2", file: "Dog_Collar_1.glb", description: "Classic red nylon collar for extra comfort." },
    { name: "Dog Collar 3", file: "Red_Bow_Collar_.glb", description: "Stylish red bow collar for a fancy look." }
  ],
  cat: [
    { name: "Cat Collar 1", file: "Cat_Collar_1.glb", description: "Soft velvet collar with a tiny bell." },
    { name: "Pink Leather Collar", file: "Pink_Leather_Cat_Coll_.glb", description: "Premium pink leather with gold buckle." },
    { name: "Purple Bow Collar", file: "Purple_Bow_Collar_.glb", description: "Elegant purple bow collar for style." }
  ]
};

const PetAccessories = ({ selectedPet }) => {
  const [selectedAccessory, setSelectedAccessory] = useState(null);

  useEffect(() => {
    console.log("Selected Pet:", selectedPet);
  }, [selectedPet]);

  if (!selectedPet) {
    return <div className="error">No pet selected. Please choose a pet.</div>;
  }

  const accessories = accessoryData[selectedPet] || [];

  return (
    <div className="accessory-container">
      <h2>Groom Your Pet {selectedPet.charAt(0).toUpperCase() + selectedPet.slice(1)}</h2>

      <div className="accessory-list">
        {accessories.map((accessory) => (
          <AccessoryItem
            key={accessory.file}
            accessory={accessory}
            isSelected={selectedAccessory === accessory.file}
            onSelect={() => setSelectedAccessory(accessory.file)}
          />
        ))}
      </div>
    </div>
  );
};

const AccessoryItem = ({ accessory, isSelected, onSelect }) => {
  const { scene, error, isLoading } = useGLTF(`/accessory/${accessory.file}`);

  return (
    <div className={`accessory-item ${isSelected ? "selected" : ""}`}>
      <h3>{accessory.name}</h3>
      <p>{accessory.description}</p>

      <div className="accessory-display">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls />
          {scene && <primitive object={scene} scale={4} position={[0, 1, 0]} />}
        </Canvas>
      </div>

      <div className="accessory-buttons">
        <button className={`select-button ${isSelected ? "active" : ""}`} onClick={onSelect}>
          {isSelected ? "Selected" : "Select"}
        </button>
        <button className="cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default PetAccessories;
