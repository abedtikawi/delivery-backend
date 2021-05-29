const Items = require("../models/items");
const validateBody = require("../utils/validateBody");

/**
 *
 * @param {itemName,price,quantity,clientID} req
 * @param {fname,lname,city,street,address,phoneNumber,zipCode,description} req
 * @returns {mongoose item object with nested destination}
 */
module.exports = async (req, res) => {
  console.log("[+] Checking request for empty fields in InsertItem");
  // Passing the request with utils.validateBody for validation errors
  if (validateBody(req, res)) {
    console.log("[-] Request failed Validation");
    return;
  }
  



  try {
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
