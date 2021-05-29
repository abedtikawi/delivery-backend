const Items = require("../models/items");
module.exports = async (req, res) => {
  try {
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
