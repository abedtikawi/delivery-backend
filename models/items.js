const mongoose = require("mongoose");
const itemsSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
    },
    price: {
      type: String,
    },
    clientID: { type: mongoose.Schema.Types.ObjectId, ref: "Clients" },
    
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Items", itemsSchema);
