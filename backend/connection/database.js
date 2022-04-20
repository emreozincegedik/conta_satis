const mysql = require("mysql");

var config = {
	connectionLimit: 10,
	// host: "test-mysql-db.cijlmqjvxs12.us-east-2.rds.amazonaws.com",
	host: "localhost",
	user: "root",
	// password: "Test123*",
	password: "",
	port: 3306,
	database: "ecommerce",
};

var pool = mysql.createPool(config);

module.exports = pool;
