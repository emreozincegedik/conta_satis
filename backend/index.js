const { urlencoded } = require("express");
const express = require("express");
const app = express();
var cors = require("cors");

const users = require("./routes/users");
const products = require("./routes/products");
const categories = require("./routes/categories");
const images = require("./routes/images");

const port = 5000;

app.use(express.static("public"));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use(express.static(dir));
app.use("/users", users);
app.use("/products", products);
app.use("/categories", categories);
app.use("/images", images);

app.post("/", (req, res) => {
	res.send("asd");
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
