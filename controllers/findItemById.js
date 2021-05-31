const Item = require("../models/items");
const mongoose = require("mongoose");
/**
 *
 * @param {id} req.query
 * @returns {mongoose Item Object}
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
    // Query database for the item
    console.log(`[+] Searching DB for item with id ${req.query.id}`);
    // Populate Destination id 
    let findItem = await Item.findById(req.query.id)
      .populate("destinationID", "-__v -createdAt -updatedAt")
      .select("-__v -createdAt -updatedAt");
    if (findItem) {
      // Item exists,return item in response
      console.log("[+] Successfully returned item");
      return res.status(200).json({ msg: "Success", api: findItem });
    } else {
      // Item doesn't exist in db, return 404
      console.log("[-] Item does not exist in DB");
      return res.status(404).json({ msg: "Item does not exist" });
    }
  } catch (error) {
    console.log(`[-] error occured in findItem`);
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
