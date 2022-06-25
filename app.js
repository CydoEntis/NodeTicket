const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ticketRoutes = require("./routes/ticket.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const sequelize = require("./database/db");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", dashboardRoutes);
app.use("/", ticketRoutes);

sequelize
	.sync()
	.then((result) => {
		app.listen(3000);
	})
	.catch((err) => {
		console.log("A Connection could not be made");
	});
