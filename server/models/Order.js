const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
//     items: {
//       type: Array
//     },
//     name: {
//       type: String,
//       require: true,
//     },
//     phoneNumber: {
//       type: String,
//       require: true,
//     },
//     address: {
//       type: String,
//       require: true,
//     },
//     items: {
//       type: String,
//       require: true,
//     },
//     userId: {
//       type: String,
//       require: true,
//     },
//   },
//   { timestamps: true }
// );

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    items: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
