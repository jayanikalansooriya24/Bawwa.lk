import React, { useState, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './PetModel.css';
import PetAccessories from '../PetAccessories/PetAccessories.jsx';
import { FaShoppingCart } from 'react-icons/fa'; // Cart Icon from react-icons

export function PetModel() {
  const [selectedPet, setSelectedPet] = useState('dog');
  const { scene, error, isLoading } = useGLTF(`/models/${selectedPet}.glb`);
  const modelRef = useRef();
  const containerRef = useRef();
  const accessoriesRef = useRef();
  const footerRef = useRef();

  // Cart state
  const [cartItems, setCartItems] = useState(0);

  // State to track container dimensions
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isLoading) {
    return <div className="loading">Loading model...</div>;
  }

  if (error) {
    return <div className="error">Error loading pet model: {error.message}</div>;
  }

  const scaleFactor = Math.min(containerSize.width, containerSize.height) / 15;

  // Handle Cart Item Update (For demonstration, it could be based on user interaction)
  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <div className="pet-model-container" ref={containerRef} style={{ marginTop: '100px', marginBottom: '80px' }}>
      <div className="pet-content flex flex-wrap justify-center items-center">

        {/* Cart Icon with Item Count */}
        <div className="cart-icon-container absolute top-6 right-6 z-50">
          <div className="relative">
            <FaShoppingCart size={30} className="text-black cursor-pointer" />
            {cartItems > 0 && (
              <div className="cart-badge absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems}
              </div>
            )}
          </div>
        </div>

        {/* 3D Model Canvas */}
        <div className="pet-canvas-container w-full md:w-1/2 p-4" style={{ marginBottom: '250px' }}>
          <Canvas camera={{ position: [0, 2, 40], fov: 60, near: 0.1, far: 1000 }} className="pet-canvas">
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} intensity={2} angle={0.15} />
            <OrbitControls target={[0, -3, 0]} />
            <group ref={modelRef}>
              <primitive object={scene} scale={scaleFactor} position={[0, -3, 0]} rotation={[0, Math.PI, 0]} />
            </group>
          </Canvas>

          {/* Pet Selection Buttons */}
          <div className="pet-buttons flex justify-center mt-4 space-x-2">
            {['dog', 'cat', 'rabbit'].map((pet) => (
              <button
                key={pet}
                onClick={() => setSelectedPet(pet)}
                className={`pet-button px-4 py-2 rounded-md transition ${
                  selectedPet === pet ? 'bg-orange-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                {pet.charAt(0).toUpperCase() + pet.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Pet Accessories */}
        <div ref={accessoriesRef} className="pet-accessories-container w-full md:w-1/2 p-6">
          <PetAccessories selectedPet={selectedPet} />
        </div>
      </div>

      <footer ref={footerRef}> {/* Footer content here */} </footer>
    </div>
  );
}