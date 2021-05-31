const Items = require("../models/items");
const mongoose = require("mongoose");
/**
 * @param {id} req.query
 * @param {itemName,price,quantity} req.body
 * @returns {Item updated Object}
 */
module.exports = async (req, res) => {
  try {
  
    console.log(
      `[+] Checking Item with id = ${req.query.id} if valid in UpdateItem`
      );
      // Check if id is not empty or not a mongoose object
      if (!req.query.id || !mongoose.isValidObjectId(req.query.id)) {
        console.log(`[-] Item with id = ${req.query.id} is not valid`);
        return res.status(400).json({ msg: "ID not valid" });
      }
      // Grab all keys from req.body to dynamically update
      const entries = Object.keys(req.body);
      console.log(`[+] Updating item's ${entries}`);
      // Grab all keys from req.body to dynamically update
      const values = Object.values(req.body);
      // Create an object that will hold all key values to be updated
      let updates = {};
      console.log(`[+] Creating the updates object  `);
      // Assign all values found in the request to the updates with the corresponding keys
      for (let index = 0; index < entries.length; index++) {
        updates[entries[index]] = values[index];
      }
      console.log(`[+] Starting update query`);
      // Update the item with the assigned values and keys
      let updateItem = await Items.findByIdAndUpdate(
        { _id: req.query.id },
        { $set: updates }
        );
        
    console.log(`[+] Update item Successfully`);

    return res.status(200).json({ msg: "Success", api: updateItem });
  } catch (error) {
    console.log(`[-] error occured in UpdateItem`);
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
