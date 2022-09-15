const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const app = express();

dotenv.config();

// middleware --------------
app.use(cors());
app.use(express.json());

// routes ------------------
readdirSync("./routes").map((f) => app.use("/", require("./routes/" + f)));

// database ----------------

mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(() => {
  console.log("Database connected");
});

// console.log(+new Date() * Math.random().toString().substring(0, 1));

console.log();

// port----------
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
