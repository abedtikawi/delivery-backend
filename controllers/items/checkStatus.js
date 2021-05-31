const Items = require("../../models/items");
const mongoose = require("mongoose");
/**
 *
 * @param {clientId,status} req.body
 * @returns {(Promise|number)}
 */
module.exports = async (req, res) => {
  try {
    console.log(
      `[+] Checking Item with id = ${req.body.clientId} if valid in UpdateItem`
    );
    // Check if clientId is not empty or not a mongoose object
    if (!req.body.clientId || !mongoose.isValidObjectId(req.body.clientId)) {
      console.log(`[-] Client with id = ${req.body.clientId} is not valid`);
      return res.status(400).json({ msg: "ID not valid" });
    }
    // Create status ,clientId variables
    const { status, clientId } = req.body;
    // Validate status for boolean value
    console.log("[+] Validating status ");

    if (!status == true || !status == false) {
      // status is not a valid boolean value
      console.log(`[-] Status validation failed ,status = ${status}`);
      return res.status(200).json({
        message: "insert a valid status ",
      });
    }
    // Query all items in db that matches clientId with clientId && dispatched matches status
    console.log(
      `[+] Searching for items in DB that match Dispatch = ${status}`
    );
    // populate the found items with the destinationID
    const findItems = await Items.find({
      clientId: clientId,
      isDispatched: status,
      isAvailable: true,
    })
      .populate("destinationID", "-__v")
      .select("-__v");

    console.log("[+] Items found Successfully");
    return res.status(200).json({
      message: "Success",
      api: { items: findItems, length: findItems.length },
    });
  } catch (error) {
    console.log("[-] Error in checkStatus.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
