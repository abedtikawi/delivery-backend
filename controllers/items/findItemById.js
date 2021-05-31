const Item = require("../../models/items");
const mongoose = require("mongoose");
/**
 *
 * @param {id} req.params
 * @returns {Promise}
 */
module.exports = async (req, res) => {
  try {
    console.log(
      `[+] Checking Item with id = ${req.params.id} if valid in UpdateItem`
    );
    // Check if id is not empty or not a mongoose object
    if (!req.params.id || !mongoose.isValidObjectId(req.params.id)) {
      console.log(`[-] Item with id = ${req.params.id} is not valid`);
      return res.status(400).json({ msg: "ID not valid" });
    }
    // params database for the item
    console.log(`[+] Searching DB for item with id ${req.params.id}`);
    // Populate Destination id
    const findItem = await Item.findById({ _id: req.params.id })
      .where("isAvailable")
      .equals(true)
      .populate("destinationID", " -createdAt -updatedAt")
      .select("-__v -createdAt -updatedAt");
    if (!findItem) {
      // Item doesn't exist in db, return 404
      console.log("[-] Item does not exist in DB");
      return res.status(404).json({ msg: "Item does not exist" });
    }
    // Item exists,return item in response
    console.log("[+] Successfully returned item");
    return res.status(200).json({ msg: "Success", api: findItem });
  } catch (error) {
    console.log(`[-] error occured in findItem`);
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
