const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      accessoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Accessory", required: true },
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 },
      image: String,
    }
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
