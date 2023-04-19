const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place" },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", orderSchema);
