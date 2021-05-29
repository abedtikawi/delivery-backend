const Clients = require("../models/clients");
const bcrypt = require("bcrypt");
const validateBody = require("../utils/validateBody");
module.exports = async (req, res) => {
  console.log("[+] Checking request for empty fields in InsertClient");
  if (validateBody(req, res)) return;

  try {
    const { fname, lname, email } = req.body;
    console.log("[+] Generating salt and encrypting Password");
    const salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(req.body.password, salt);

    console.log("[+] Creating Client ...");
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
