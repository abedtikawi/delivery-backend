const Items = require("../../models/items");
const mongoose = require("mongoose");
/**
 *
 * @param {id} req.params
 * @returns {String}
 */
module.exports = async (req, res) => {
  try {
    console.log(
      `[+] Checking itemId with id = ${req.params.id} if valid in deleteItem`
    );
    // Check if id is not empty or not a mongoose object
    if (!req.params.id || !mongoose.isValidObjectId(req.params.id)) {
      console.log(`[-] itemId with id = ${req.params.id} is not valid`);
      return res.status(400).json({ msg: "itemId not valid" });
    }

    const itemId = req.params.id;
    console.log(`[+] Querying Database to remove Item ${itemId}`);
    //Query database, find item that has the sameID and set isAvailable to false
    const deleteItem = await Items.findByIdAndUpdate(
      { _id: itemId },
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
