const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["newArrivals", "bestSellers", "topRated"],
      default: "newArrivals",
    },
    name: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
