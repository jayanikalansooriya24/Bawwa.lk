import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PaymentPortal.css";

const PaymentPortal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const total = location.state?.total || 0;

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    };

    // Validate card number (16 digits)
    if (!/^\d{16}$/.test(cardDetails.cardNumber)) {
      errors.cardNumber = "Card number must be 16 digits.";
      isValid = false;
    }

    // Validate expiration date (MM/YY format and not in the past)
    const expirationParts = cardDetails.expirationDate.split("/");
    if (expirationParts.length === 2) {
      const month = parseInt(expirationParts[0], 10);
      const year = parseInt(expirationParts[1], 10);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
        errors.expirationDate = "Invalid expiration date or it is in the past.";
        isValid = false;
      }
    } else {
      errors.expirationDate = "Expiration date must be in MM/YY format.";
      isValid = false;
    }

    // Validate CVV (3 digits)
    if (!/^\d{3}$/.test(cardDetails.cvv)) {
      errors.cvv = "CVV must be 3 digits.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Reset error message before submitting

    // Perform form validation
    if (!validateForm()) {
      setIsLoading(false);
      return; // Stop if validation fails
    }

    try {
      const response = await axios.post("http://localhost:5000/api/process-payment", {
        ...cardDetails,
        totalAmount: total,
      });

      if (response.status === 201) {
        setIsModalOpen(true); // Open modal on successful payment
      }
    } catch (err) {
      setError("Payment processing failed. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/PetModel"); // Optionally redirect to a "Thank You" page
  };

  return (
    <div className="payment-container">
      <h2>Payment Portal</h2>
      <p>Total Amount: ${total.toFixed(2)}</p>
      <form onSubmit={handleSubmit}>
        <label>Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          value={cardDetails.cardNumber}
          onChange={handleInputChange}
          placeholder="1234 5678 9012 3456"
          required
        />
        {validationErrors.cardNumber && <p className="error-message">{validationErrors.cardNumber}</p>}

        <label>Expiration Date:</label>
        <input
          type="text"
          name="expirationDate"
          value={cardDetails.expirationDate}
          onChange={handleInputChange}
          placeholder="MM/YY"
          required
        />
        {validationErrors.expirationDate && <p className="error-message">{validationErrors.expirationDate}</p>}

        <label>CVV:</label>
        <input
          type="text"
          name="cvv"
          value={cardDetails.cvv}
          onChange={handleInputChange}
          placeholder="123"
          required
        />
        {validationErrors.cvv && <p className="error-message">{validationErrors.cvv}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Complete Payment"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}

      <button onClick={() => navigate("/PetModel")}>Cancel</button>

      {/* Modal dialog */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Payment Completed Successfully!</h3>
            <p>Your payment has been processed. Thank you for your purchase!</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPortal;
