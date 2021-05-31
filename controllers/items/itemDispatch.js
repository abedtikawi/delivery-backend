const Items = require("../../models/items");
const mongoose = require("mongoose");
/**
 *
 * @param {id} req.params
 * @returns {Object}
 */
module.exports = async (req, res) => {
  try {
    console.log(
      `[+] Checking Item with id = ${req.params.id} if valid in itemDispatch`
    );
    // Check if id is not empty or not a mongoose object
    if (!req.params.id || !mongoose.isValidObjectId(req.params.id)) {
      console.log(`[-] Item with id = ${req.params.id} is not valid`);
      return res.status(400).json({ msg: "ID not valid" });
    }
    console.log("[+] Fetching Item from DB and dispatching ");
    // find item and set dispatch value to True
    const dispatchItem = await Items.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { isDispatched: true } }
    );
    console.log(`[+] Successfully dispatched Item with id=${req.params.id}`);
    return res.status(200).json({ message: "Success", api: dispatchItem });
  } catch (error) {
    console.log("[-] Error in itemDispatch.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
