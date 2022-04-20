const express = require("express");
const router = express.Router();
const { check, body, validationResult } = require("express-validator");
const customIsExist = require("../controller/customIsExist");
const db = require("../connection/database");

router.get("/login", (req, res) => {
	res.status(200).json({ msg: "yes" });
});

router.post(
	"/login",
	[
		check("email").isEmail().withMessage("Email kurallarına uymuyor!"),
		check("password").notEmpty().withMessage("Şifre boş olamaz!"),
		check("email_password").custom((value, { req }) => {
			return customIsExist(
				[req.body.email, req.body.password],
				"select * from users where email = ? and password = ?",
				"Email ya da şifre yanlış",
				true
			).catch((err) => Promise.reject(err));
		}),
	],
	(req, res) => {
		console.log(req.body);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.array() });
		}
		const { email, password } = req.body;
		db.query(
			"select * from users where email = ? and password = ?",
			[email, password],
			(error, results, fields) => {
				if (error) {
					res.status(500).json({ msg: error.code });
				}
				res.status(200).json(results);
			}
		);
	}
);

router.post(
	"/register",
	[
		check("email")
			.normalizeEmail()
			.isEmail()
			.withMessage("Email kurallarına uymuyor!")
			.custom((value) => {
				return customIsExist(
					[value],
					"select * from users where email = ?",
					"Bu email kullanılıyor"
				).catch((err) => Promise.reject(err));
			}),
		check("password").notEmpty().withMessage("Şifre boş olamaz!"),
		check("name").notEmpty().withMessage("İsim boş olamaz!").trim().escape(),
		check("surname").notEmpty().withMessage("İsim boş olamaz!").trim().escape(),
		check("address")
			.notEmpty()
			.withMessage("Adres boş olamaz!")
			.isLength({ max: 250 })
			.withMessage("Adres en fazla 250 karakter olabilir")
			.trim()
			.escape(),
		check("phone")
			.notEmpty()
			.withMessage("Telefon boş olamaz!")
			/* .matches(/\d{11}/)
			.withMessage("Telefon 11 haneli olmalı!") */
			.trim()
			.escape(),
	],

	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.array() });
		}
		const { email, password, name, surname, address, phone } = req.body;
		db.query(
			"insert into users (email,password,name,surname,address,phone) values (?,?,?,?,?,?)",
			[email, password, name, surname, address, phone],
			(error2, results2, fields2) => {
				if (error2) {
					return res.status(500).json({ msg: error2.code });
				} else {
					return res.status(200).json(results2);
				}
			}
		);
	}
);

module.exports = router;
