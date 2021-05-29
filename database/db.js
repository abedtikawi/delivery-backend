/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("[+] Trying to connect to Database");
    await mongoose.connect(process.env.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      autoIndex: true,
      keepAlive: true,
    });
    console.log(`[+] Connected to Mongo DB`);
  } catch (err) {
    if (err.name === "MongoNetworkError" || err.code === "ECONNREFUSED") {
      return console.log("no internet on server");
    }
    console.log("[-] Connection Error", err);

    process.exit(1);
  }
};
module.exports = connectDB;
