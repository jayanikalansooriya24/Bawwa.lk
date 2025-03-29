import React, { useState, useEffect, useRef } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { TextureLoader, SphereGeometry } from "three";
import { OrbitControls, Stars } from "@react-three/drei";

extend({ SphereGeometry });

// Separate component for the animated sphere
const AnimatedSphere = ({ texture, normalMap }) => {
  const meshRef = useRef();

  // Animation for subtle rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Slow rotation for realism
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[2, 128, 128]} />
      <meshStandardMaterial
        map={texture}
        normalMap={normalMap}
        roughness={0.4}
        metalness={0.1}
        bumpMap={texture}
        bumpScale={0.05}
        envMapIntensity={0.5}
      />
    </mesh>
  );
};

const PetImageTo3D = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [texture, setTexture] = useState(null);
  const [normalMap, setNormalMap] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      alert("Please upload a valid JPEG or PNG image.");
    }
  };

  // Load texture and generate a simple normal map
  useEffect(() => {
    if (imageUrl) {
      const loader = new TextureLoader();
      loader.load(
        imageUrl,
        (loadedTexture) => {
          setTexture(loadedTexture);
          // Simulate a normal map (placeholder)
          loader.load(
            "https://threejs.org/examples/textures/normalmap.jpg",
            (normalTexture) => {
              normalTexture.repeat.set(1, 1);
              setNormalMap(normalTexture);
            },
            undefined,
            (error) => console.error("Error loading normal map:", error)
          );
        },
        undefined,
        (error) => console.error("Error loading texture:", error)
      );

      return () => URL.revokeObjectURL(imageUrl); // Cleanup
    }
  }, [imageUrl]);

  return (
    <div style={{ textAlign: "center", height: "100vh", background: "#1a1a1a" }}>
      <h2 style={{ color: "#fff" }}>Upload Your Pet Image for a 3D-Like Preview</h2>
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleImageUpload}
        style={{ margin: "20px" }}
      />
      <div style={{ width: "100%", height: "80%" }}>
        <Canvas shadows camera={{ position: [0, 1, 5], fov: 60 }}>
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
          />
          <pointLight position={[-5, 3, -5]} intensity={0.8} color="#ffddaa" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* Render the animated sphere only when texture is loaded */}
          {texture && <AnimatedSphere texture={texture} normalMap={normalMap} />}

          {/* Floor for shadow realism */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.2} />
          </mesh>

          {/* Controls and Background */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
          />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        </Canvas>
      </div>
      <p style={{ color: "#fff" }}>
        Note: This enhances the sphere to look more 3D-like with lighting and effects.
      </p>
    </div>
  );
};

export default PetImageTo3D;