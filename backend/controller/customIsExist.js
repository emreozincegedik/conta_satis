const db = require("../connection/database");

module.exports = (valueArray, query, existMsg, notExist = false) =>
	new Promise((resolve, reject) => {
		// console.log(valueArray, query);
		db.query(query, valueArray, (error, results, fields) => {
			if (error) {
				reject(new Error(error.code));
			}
			//notExist = false, gives error when no result exist, else gives error when any result exist
			if (!notExist) {
				if (results.length !== 0) {
					reject(new Error(existMsg));
				} else {
					resolve(true);
				}
			} else {
				if (results.length === 0) {
					reject(new Error(existMsg));
				} else {
					resolve(true);
				}
			}
		});
	});
