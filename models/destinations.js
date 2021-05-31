const mongoose = require("mongoose");

const destinationSchema = mongoose.Schema(
  {
    fname: { type: String },
    lname: { type: String },
    city: { type: String },
    street: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    zipCode: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Destinations", destinationSchema);
