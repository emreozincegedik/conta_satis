const express = require("express");
const router = express.Router();
const { check, validationResult, checkSchema } = require("express-validator");
const isLoggedIn = require("../controller/isLoggedIn");
const customIsExist = require("../controller/customIsExist");
const path = require("path");
const db = require("../connection/database");

router.post("/selectAll", (req, res) => {
	db.query("select * from categories", (error, result, fields) => {
		if (error) {
			return res.status(500).json({ msg: error.code });
		}

		res.status(result.length === 0 ? 404 : 200).json(result);
	});
});

router.post(
	"/selectSingle",
	check("name").notEmpty().withMessage("Kategori ismi gönderilmemiş"),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.array() });
		}
		db.query(
			"select * from categories where name = ?",
			[req.body.name],
			(error, result, fields) => {
				if (error) {
					return res.status(500).json({ msg: error.code });
				}

				res.status(result.length === 0 ? 404 : 200).json(result);
			}
		);
	}
);

router.post(
	"/add",
	[
		check("name")
			.notEmpty()
			.withMessage("İsim boş olamaz!")
			.custom((value) => {
				return customIsExist(
					[value],
					"select * from categories where name = ?",
					"Bu kategori zaten var!"
				).catch((err) => Promise.reject(err));
			}),
		check("email").custom((value, { req }) => {
			return isLoggedIn(value, req.body.password, true).catch((err) =>
				Promise.reject(err)
			);
		}),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.array() });
		}
		const { name } = req.body;
		db.query(
			"insert into categories (name) values (?)",
			[name],
			(error, results, fields) => {
				if (error) {
					return res.status(500).json(error);
				}
				res.status(200).json(results);
			}
		);
	}
);

router.post(
	"/delete",
	check("id").notEmpty().withMessage("Kategori ID'si gönderilmemiş"),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.array() });
		}
		db.query(
			"delete from categories where id = ?",
			[req.body.id],
			(error, results, fields) => {
				if (error) {
					res.status(500).json({ msg: error });
				}
				res.status(200).json(results);
			}
		);
	}
);
router.post(
	"/update",
	check("id").notEmpty().withMessage("Kategori ID'si gönderilmemiş"),
	check("name")
		.notEmpty()
		.withMessage("Kategori ismi gönderilmemiş")
		.custom((value) => {
			return customIsExist(
				[value],
				"select * from categories where name = ?",
				"Bu kategori zaten var!"
			).catch((err) => Promise.reject(err));
		}),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.array() });
		}
		const { id, name } = req.body;
		db.query(
			"update categories set name = ? Where id = ?",
			[name, id],
			(error, results, fields) => {
				if (error) {
					res.status(500).json(error);
				}
				res.status(200).json(results);
			}
		);
	}
);

module.exports = router;
