const mongoose = require("mongoose");
const itemsSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
    },
    price: {
      type: String,
    },
    quantity: { type: Number },
    clientID: { type: mongoose.Schema.Types.ObjectId, ref: "Clients" },
    destinationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destinations",
    },
    dispatched: { type: String, default: "false" },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Items", itemsSchema);
