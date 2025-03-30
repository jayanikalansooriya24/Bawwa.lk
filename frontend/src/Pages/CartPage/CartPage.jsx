import React, { useState, Suspense } from 'react';
import { useCart } from '../CartPage/CartContext';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CartPage.css';

const CartPage = () => {
  const { cart, setCart } = useCart();
  const [selectedItems, setSelectedItems] = useState(cart.map((item) => item.file));
  const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const navigate = useNavigate();

  const initiateRemoveItem = (file) => {
    setItemToRemove(file);
    setRemoveDialogOpen(true);
  };

  const confirmRemoveItem = () => {
    if (itemToRemove) {
      setCart((prevCart) => prevCart.filter((item) => item.file !== itemToRemove));
      setSelectedItems((prevSelected) => prevSelected.filter((item) => item !== itemToRemove));
      setRemoveDialogOpen(false);
      setSuccessDialogOpen(true);
      setTimeout(() => {
        setSuccessDialogOpen(false);
        setItemToRemove(null);
      }, 2000); // Show success dialog for 2 seconds
    }
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
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(price);
  };

  return (
    <div className="cart-page-container">
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cart.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="empty-cart"
            >
              Your cart is empty. Start shopping now!
            </motion.p>
          ) : (
            cart.map((item, index) => (
              <motion.div
                key={item.file}
                className="cart-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.file)}
                  onChange={() => toggleItemSelection(item.file)}
                  className="cart-checkbox"
                />
                <div className="cart-3d-model">
                  <Suspense fallback={<div className="loading-model">Loading...</div>}>
                    <Canvas>
                      <ambientLight intensity={0.6} />
                      <directionalLight position={[10, 10, 5]} intensity={1.2} />
                      <OrbitControls enableZoom={false} enablePan={false} />
                      <AccessoryModel file={item.file} />
                    </Canvas>
                  </Suspense>
                </div>
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p className="cart-description">{item.description}</p>
                  <p className="cart-price">Price: {formatPrice(item.price)}</p>
                  <p className="cart-total">
                    Total: {formatPrice(item.price * item.quantity)}
                  </p>
                  <div className="quantity-selector">
                    <button onClick={() => updateQuantity(item.file, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.file, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => initiateRemoveItem(item.file)}
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="payment-summary"
        >
          <h3>Order Summary</h3>
          <p className="total-price">
            Total: <strong>{formatPrice(totalPrice)}</strong>
          </p>
          <button
            className="pay-now-btn"
            disabled={selectedItems.length === 0}
            onClick={() => navigate('/paymentPortal', { state: { total: totalPrice } })}
          >
            Proceed to Checkout
          </button>
        </motion.div>
      </div>

      {isRemoveDialogOpen && (
        <>
          <motion.div
            className="dialog-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setRemoveDialogOpen(false)}
          />
          <motion.div
            className="remove-dialog-box"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Remove Item</h3>
            <p>Are you sure you want to remove this item from your cart?</p>
            <div className="dialog-buttons">
              <button className="confirm-btn" onClick={confirmRemoveItem}>
                Yes
              </button>
              <button
                className="cancel-btn"
                onClick={() => setRemoveDialogOpen(false)}
              >
                No
              </button>
            </div>
          </motion.div>
        </>
      )}

      {isSuccessDialogOpen && (
        <>
          <motion.div
            className="dialog-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="success-dialog-box"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="success-animation">
              <svg className="checkmark" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
              <p>Successfully Removed!</p>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

const AccessoryModel = ({ file }) => {
  const { scene } = useGLTF(`http://localhost:5000/uploads/${file}`);
  return <primitive object={scene} scale={3} position={[0, -1, 0]} />;
};

export default CartPage;