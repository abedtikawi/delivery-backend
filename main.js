require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const connectDB = require("./database/db");
const indexRouter = require("./routes/router");
// Connecting to Database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api',indexRouter)
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
});
