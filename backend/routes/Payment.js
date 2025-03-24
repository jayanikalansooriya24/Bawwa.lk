import express from "express";
import Payment from "../models/Payment.js"; // Correctly import Payment model

const router = express.Router();

// Route to handle the payment request
router.post('/process-payment', async (req, res) => {
  const { cardNumber, expirationDate, cvv, totalAmount } = req.body;

  try {
    const newPayment = new Payment({
      cardNumber,
      expirationDate,
      cvv,
      totalAmount,
    });

    const savedPayment = await newPayment.save(); // Save the payment to the DB
    res.status(201).json(savedPayment); // Return the saved payment details
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(400).json({ message: 'Payment processing failed' });
  }
});

export default router; // Export the router to be used in the app
