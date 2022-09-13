const express = require("express");
const { hello } = require("../controllers/user");
const router = express.Router();

router.get("/user", hello);

module.exports = router;
