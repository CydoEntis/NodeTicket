const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ticketRoutes = require("./routes/tickets.router");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", ticketRoutes);

app.listen(3000);
