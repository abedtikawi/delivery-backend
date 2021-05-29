const mongoose = require("mongoose");
const clientSchema = mongoose.Schema(
  {
    fname: { type: String },
    lname: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    phoneNumber: { type: Number },
    itemsID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items",
      },
    ],

    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Clients", clientSchema);
