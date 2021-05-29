const express = require("express");
require('dotenv').config()
const app = express();
const connectDB = require("./database/db");
const port = 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
