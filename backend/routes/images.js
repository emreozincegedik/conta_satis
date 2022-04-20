const express = require("express");
const router = express.Router();
const { check, validationResult, checkSchema } = require("express-validator");
const isLoggedIn = require("../controller/isLoggedIn");
const path = require("path");
const db = require("../connection/database");

router.get("/*", (req, res) => {
	var imgPath = req.url;
	res.sendFile(path.join(__dirname, "../images" + imgPath));
});

module.exports = router;
