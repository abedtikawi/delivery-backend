const Clients = require("../models/clients");
const bcrypt = require("bcrypt");
const validateBody = require("../utils/validateBody");
/** Body params
 * @param fname
 * @param lname
 * @param email
 * @param password min 6
 * @param phoneNumber min 6 isNumeric
 */
module.exports = async (req, res) => {
  console.log("[+] Checking request for empty fields in InsertClient");
  // Passing the request with utils.validateBody for validation errors
  if (validateBody(req, res)) {
    console.log("[-] Request failed Validation");
    return;
  }

  try {
    const { fname, lname, email, phoneNumber } = req.body;
    // Checking if client already exists in db
    console.log("[+] Checking if client already exists in DB");
    let checkUser = await Clients.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
    if (checkUser) {
      // Client Already Exists
      console.log("[-] User Already Exists");
      return res.status(401).json({ message: "User already exists" });
    }

    console.log("[+] Generating salt and encrypting Password");
    // Generating Salt=10
    const salt = await bcrypt.genSalt(10);
    // Encrypting password
    let encryptedPassword = await bcrypt.hash(req.body.password, salt);
    console.log("[+] Creating Client ...");
    // Creating a client object and inserting into Database
    let client = await Clients.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });

    console.log(`[+] Successfully created Client ${email}`);
    return res.status(200).json({ msg: "Success", api: client });
  } catch (error) {
    console.log("[-] An error occured in InsertClient.js");
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
