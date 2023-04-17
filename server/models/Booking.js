const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
