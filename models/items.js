const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema(
  {
    itemName: { type: String },
    price: { type: String },
    quantity: { type: Number },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Clients" },
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destinations",
    },
    isDispatched: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Items", itemsSchema);
