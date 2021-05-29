const mongoose = require("mongoose");
const clientSchema = mongoose.Schema(
  {
    fname: {
      type: String,
    },
    lname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Clients", clientSchema);
