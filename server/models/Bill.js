const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
  {
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
