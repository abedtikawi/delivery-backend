const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./database/db");
const cors = require("cors");
const indexRouter = require("./routes/router");
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api',indexRouter)
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
});
