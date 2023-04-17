const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
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
