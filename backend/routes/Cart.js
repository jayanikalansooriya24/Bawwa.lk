const express = require("express");
const Cart = require("../models/cart");
const router = express.Router();

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { userId, accessoryId, name, price, image } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) cart = new Cart({ userId, items: [] });

    const existingItem = cart.items.find(item => item.accessoryId.toString() === accessoryId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ accessoryId, name, price, image, quantity: 1 });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cart items
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.accessoryId");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
router.post("/remove", async (req, res) => {
  try {
    const { userId, accessoryId } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.accessoryId.toString() !== accessoryId);
    await cart.save();

    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
