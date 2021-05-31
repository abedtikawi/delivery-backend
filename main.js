require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./database/db");
const itemRouter = require("./routes/itemRouter");
const clientRouter=require('./routes/clientRouter')
// Connecting to Database
connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/item", itemRouter);
app.use("/client", clientRouter);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
});
