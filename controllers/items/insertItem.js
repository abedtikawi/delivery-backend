const Items = require("../../models/items");
const Clients = require("../../models/clients");
const Destinations = require("../../models/destinations");
const validateBody = require("../../utils/validateBody");

/**
 *
 * @param {
 * itemName,price,quantity,
 * clientId,fname,lname,
 * city,street,address,
 * phoneNumber,zipCode,description} req.body
 * @returns {Promise}
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
    const {
      itemName,
      quantity,
      price,
      fname,
      lname,
      city,
      street,
      address,
      phoneNumber,
      zipCode,
      description,
      clientId,
    } = req.body;
    console.log("[+] Creating Destination Object");
    // Creating the Destination Object
    const destinationObj = {
      fname,
      lname,
      city,
      street,
      address,
      phoneNumber,
      zipCode,
      description,
    };

    console.log("[+] Inserting Destination Object into DB");
    // Insert Destination Query with the object created Above
    const insertDestination = await Destinations.create(destinationObj);
    console.log("[+] Successfully inserted Destination Object");

    console.log("[+] Inserting Item into DB with the Destination ID");
    // Inserting into Items with the insertDestination._id for relations
    const insertItem = await Items.create({
      itemName: itemName,
      price: price,
      quantity: quantity,
      clientId: clientId,
      destinationId: insertDestination._id,
    });
    console.log("[+] Successfully Created Item");

    // Inserting Item into Client with the corresponding id
    console.log(`[+] Inserting Item into client's items array `);
    const addClientItem = await Clients.findByIdAndUpdate(
      { _id: clientId },
      { $push: { itemsId: insertItem._id } }
    );
    console.log("[+] Successfully inserted Item into Client array");
    return res.status(200).json({
      msg: "Success",
      api: { destination: insertDestination, item: insertItem },
    });
  } catch (error) {
    console.log("[-] Error occured in InsertItem.js");
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
