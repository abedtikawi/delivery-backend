const Items = require("../models/items");
const mongoose = require("mongoose");
module.exports = async (req, res) => {
  try {
    console.log(
      `[+] Checking Item with id = ${req.query.id} if valid in itemDispatch`
    );
    // Check if id is not empty or not a mongoose object
    if (!req.query.id || !mongoose.isValidObjectId(req.query.id)) {
      console.log(`[-] Item with id = ${req.query.id} is not valid`);
      return res.status(400).json({ msg: "ID not valid" });
    }
    console.log("[+] Fetching Item from DB and dispatching ");
    // find item and set dispatch value to True
    let dispatchItem = await Items.findByIdAndUpdate(
      { _id: req.query.id },
      { $set: { dispatched: "true" } }
    );
    console.log(`[+] Successfully dispatched Item with id=${req.query.id}`);
    return res.status(200).json({ message: "Success", api: dispatchItem });
  } catch (error) {
    console.log("[-] Error in itemDispatch.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
