const Items = require("../models/items");
const mongoose = require("mongoose");
module.exports = async (req, res) => {
  try {
    console.log(
      `[+] Checking itemID with id = ${req.query.id} if valid in deleteItem`
    );
    // Check if id is not empty or not a mongoose object
    if (!req.query.id || !mongoose.isValidObjectId(req.query.id)) {
      console.log(`[-] itemID with id = ${req.query.id} is not valid`);
      return res.status(400).json({ msg: "itemID not valid" });
    }

    const itemID = req.query.id;
    console.log(`[+] Querying Database to remove Item ${itemID}`);
    //Query database, find item that has the sameID and set isAvailable to false
    let deleteItem = await Items.findByIdAndUpdate(
      { _id: itemID },
      { $set: { isAvailable: "false" } }
    );
    console.log("[+] Successfully deleted Item");
    return res.status(500).json({ msg: "Success" });
  } catch (error) {
    console.log("[-] Error in deleteItem.js");
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
