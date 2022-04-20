const db = require("../connection/database");

module.exports = (email, password, checkSeller = false) =>
	new Promise((resolve, reject) => {
		db.query(
			"select * from users where email = ? and password = ?",
			[email, password],
			(error, results, fields) => {
				if (error) {
					reject(error.code);
				} else {
					if (results.length === 0) {
						reject("Giriş yapılmamış!");
					} else {
						if (checkSeller && results[0]["isSeller"] === 0) {
							reject("Kullanıcı satıcı değil!");
						} else {
							resolve();
						}
					}
				}
			}
		);
	});
