const Items = require("../models/items");
const mongoose = require("mongoose");
/**
 *
 * @param {clientID,status} req.body
 * @returns {array of items,length of array}
 */
module.exports = async (req, res) => {
  try {
    console.log(
      `[+] Checking Item with id = ${req.body.clientID} if valid in UpdateItem`
    );
    // Check if clientID is not empty or not a mongoose object
    if (!req.body.clientID || !mongoose.isValidObjectId(req.body.clientID)) {
      console.log(`[-] Client with id = ${req.body.clientID} is not valid`);
      return res.status(400).json({ msg: "ID not valid" });
    }
    // Create status variable to hold request status
    const status = req.body.status;
    // Validate status for boolean value
    console.log("[+] Validating status ");
    if (
      !status ||
      !status == "false" ||
      !status == "true" ||
      !status.length > 0
    ) {
      // status is not a valid boolean value
      console.log("[-] Status validation failed ");
      return res.status(400).json({ message: "insert a valid status " });
    }

    // Query all items in db that matches clientID with req.body.clientID && dispatched matches req.body.status
    console.log(
      `[+] Searching for items in DB that match Dispatch = ${status}`
    );
    // populate the found items with the destinationID
    let findItems = await Items.find({
      clientID: req.body.clientID,
      dispatched: status,
    })
      .populate("destinationID", "-__v")
      .select("-__v");
    if (findItems.length > 0) {
      console.log("[+] Items found Successfully");
      return res.status(200).json({
        message: "Success",
        api: { items: findItems, length: findItems.length },
      });
    } else {
      // No items found in db
      console.log("[+] No items found");
      return res.status(200).json({
        message: "No items found in DB",
      });
    }
  } catch (error) {
    console.log("[-] Error in checkStatus.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
