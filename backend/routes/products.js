const express = require("express");
const router = express.Router();
const { check, validationResult, checkSchema } = require("express-validator");
const isLoggedIn = require("../controller/isLoggedIn");
const path = require("path");
const db = require("../connection/database");

const multer = require("multer");
const customIsExist = require("../controller/customIsExist");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		// console.log(file);
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({ storage: storage });

router.post(
	"/add",
	[
		upload.fields([{ name: "file", maxCount: 5 }]),
		check("title").notEmpty().withMessage("Başlık boş olamaz!").trim().escape(),
		check("description")
			.notEmpty()
			.withMessage("Açıklama boş olamaz!")
			.trim()
			.escape(),
		check("price")
			.notEmpty()
			.withMessage("Fiyat boş olamaz!")
			.isFloat({ min: 0 })
			.withMessage("Fiyat 0dan düşük olamaz")
			.toFloat(),
		check("stock")
			.notEmpty()
			.withMessage("Stok boş olamaz!")
			.isInt({ min: 0 })
			.withMessage("Stok 0dan düşük olamaz")
			.toInt(),
		checkSchema({
			file: {
				custom: {
					options: (value, { req, path }) => !!req.files[path],
					errorMessage: "Resim gönderilmemiş",
				},
			},
		}),
		check("email")
			.custom((value, { req }) =>
				isLoggedIn(value, req.body.password).catch((err) => Promise.reject(err))
			)
			.custom((value, { req }) => {
				return customIsExist(
					[value, req.body.password, req.body.title],
					"select * from products join users on users.id = products.sellerId where users.email=? and users.password=? and products.title=?",
					"Bu ürün zaten var!"
				).catch((err) => Promise.reject(err));
			}),
		check("category")
			.notEmpty()
			.withMessage("Kategori boş olamaz!")
			.custom((value) => {
				return customIsExist(
					[value],
					"select * from categories where id = ?",
					"Bu kategori yok!",
					true
				).catch((err) => Promise.reject(err));
			}),
	],
	(req, res) => {
		// console.log(req.body, req.files);
		// console.log(req.files.file === undefined);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			if (req.files.file !== undefined) {
				const fs = require("fs");
				fs.unlink(req.files.file[0].path, (err) => {
					if (err) {
						return res.status(400).json({ msg: err });
					}
				});
			}
			return res.status(400).json({ msg: errors.array() });
		}
		const { title, description, price, stock, email, password, category } =
			req.body;
		const filePath = req.files.file[0].path;
		db.query(
			`insert into products (title,description,price,stock,image,sellerId,categoryId) VALUES
(?,?,?,?,?,(select id from users where users.email = ? and users.password=?),?)`,
			[title, description, price, stock, filePath, email, password, category],
			(err, results, fields) => {
				if (err) {
					res.status(500).json(err);
				}
				res.status(200).json(results);
			}
		);
		// res.status(200).json([req.body, req.files]);
	}
);

router.post(
	"/selectSellerAll",
	[
		check("email").custom((value, { req }) =>
			isLoggedIn(value, req.body.password).catch((err) => Promise.reject(err))
		),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.array() });
		}
		const { email, password } = req.body;
		db.query(
			"select products.* from products join users on users.id=products.sellerId where users.email=? and users.password =? ",
			[email, password],
			(error, results, fields) => {
				if (error) {
					res.status(500).json({ msg: error.code });
				}
				console.log(results);
				res.status(200).json(results);
			}
		);
	}
);

router.post(
	"/selectSellerSingle",
	[
		check("email").custom((value, { req }) =>
			isLoggedIn(value, req.body.password).catch((err) => Promise.reject(err))
		),
		check("id").notEmpty().withMessage("Ürün ID'si boş olamaz!"),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.array() });
		}
		const { email, password, id } = req.body;
		db.query(
			"select products.image from products join users on users.id=products.sellerId where users.email=? and users.password =? and products.id=?",
			[email, password, id],
			(error, results, fields) => {
				if (error) {
					res.status(500).json({ msg: error.code });
				}
				var options = {
					root: path.join(__dirname, "../"),
				};
				if (results.length === 0) {
					return res.status(404).json({ msg: "No image found" });
				}
				res.sendFile(results[0]["image"], options);
				// res.json(results).status(200);
			}
		);
	}
);

module.exports = router;
