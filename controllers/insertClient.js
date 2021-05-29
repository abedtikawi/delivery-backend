const Clients = require("../models/clients");
module.exports = async (req, res) => {
  try {
    console.log("[+] Creating client");
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
