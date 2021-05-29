const Items = require("../models/items");
const Destinations = require("../models/destinations");
const validateBody = require("../utils/validateBody");

/**
 *
 * @param {
 * itemName,price,quantity,
 * clientID,fname,lname,
 * city,street,address,
 * phoneNumber,zipCode,description} req
 * @returns {mongoose item object with nested destination}
 */
module.exports = async (req, res) => {
  console.log("[+] Checking request for empty fields in InsertItem");
  // Passing the request with utils.validateBody for validation errors
  if (validateBody(req, res)) {
    console.log("[-] Request failed Validation");
    return;
  }
  console.log("[+] Request Passed Validation");
  try {
    console.log("[+] Creating Destination Object");
    // Creating the Destination Object
    const destinationObj = {
      fname: req.body.fname,
      lname: req.body.lname,
      city: req.body.city,
      street: req.body.street,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
      description: req.body.description,
    };

    console.log("[+] Inserting Destination Object into DB");
    // Insert Destination Query with the object created Above
    let insertDestination = await Destinations.create(destinationObj);
    console.log("[+] Successfully inserted Destination Object");


    console.log("[+] Inserting Item into DB with the Destination ID");
    // Inserting into Items with the insertDestination._id for relations
    let insertItem = await Items.create({
      itemName: req.body.itemName,
      price: req.body.price,
      quantity: req.body.quantity,
      clientID: "60b2ae3a7be3c052002f01ff",
      destinationID: insertDestination._id,
    });
    console.log("[+] Successfully Created Item");

    return res
      .status(200)
      .json({ msg: "Success", api: { insertDestination, insertItem } });
  } catch (error) {
    console.log("[-] Error occured in InsertItem.js");
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
