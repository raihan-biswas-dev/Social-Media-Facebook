const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const app = express();

dotenv.config();

// middleware --------------
app.use(cors());

// routes ------------------
readdirSync("./routes").map((f) => app.use("/", require("./routes/" + f)));

// database ----------------

mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(() => {
  console.log("Database connected");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
