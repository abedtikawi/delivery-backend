const Destinations = require("../../models/destinations");
const mongoose = require("mongoose");
/**
 * @param {id} req.params
 * @param {fname,lname,city,street,phoneNumber,zipCode,description} req.body
 * @returns {Object}
 */
module.exports = async (req, res) => {
  try {
    console.log(
      `[+] Checking Destination with id = ${req.params.id} if valid in updateDestination`
    );
    // Check if id is not empty or not a mongoose object
    if (!req.params.id || !mongoose.isValidObjectId(req.params.id)) {
      console.log(`[-] Destination with id = ${req.params.id} is not valid`);
      return res.status(400).json({ msg: "Destination not valid" });
    }
    // Grab all keys from req.body to dynamically update
    const entries = Object.keys(req.body);
    console.log(`[+] Updating Destination's ${entries}`);
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
    // Update the Destination with the assigned values and keys
    const updateDestination = await Destinations.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updates }
    );

    console.log(`[+] Update Destination Successfully`);
    return res.status(200).json({ msg: "Success", api: updateDestination });
  } catch (error) {
    console.log("[-] Error in update Destination");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
