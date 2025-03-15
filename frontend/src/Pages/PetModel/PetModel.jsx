import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './PetModel.css'; // Import the CSS file

export function PetModel() {
  const [selectedPet, setSelectedPet] = useState('dog'); // Default pet model
  const { scene, error, isLoading } = useGLTF(`/models/${selectedPet}.glb`); // Load selected pet model dynamically
  const modelRef = useRef();

  // Handle model loading state
  if (isLoading) {
    return <div className="loading">Loading model...</div>;
  }

  // Handle any loading errors
  if (error) {
    return <div className="error">Error loading pet model: {error.message}</div>;
  }

  return (
    <div className="pet-model-container">
      {/* 3D Model Canvas */}
      <Canvas
        camera={{
          position: [0, 2, 40],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        className="pet-canvas"
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={2} angle={0.15} />

        {/* OrbitControls for camera movement */}
        <OrbitControls target={[0, -3, 0]} />

        {/* Group for the model */}
        <group ref={modelRef}>
          <primitive
            object={scene}
            scale={18}
            position={[0, -4, 0]} // Lowered the model slightly
            rotation={[0, Math.PI, 0]}
          />
        </group>
      </Canvas>

      {/* Pet Selection Buttons */}
      <div className="pet-buttons">
        {['dog', 'cat', 'rabbit'].map((pet) => (
          <button
            key={pet}
            onClick={() => setSelectedPet(pet)}
            className={`pet-button ${selectedPet === pet ? 'active' : ''}`}
          >
            {pet.charAt(0).toUpperCase() + pet.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

// Ensure the body allows scrolling
document.body.style.overflowY = 'auto';
