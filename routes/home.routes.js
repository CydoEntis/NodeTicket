const express = require("express");

const homeController = require("../controllers/home/home.controller")

const homeRoutes = express.Router();

homeRoutes.get("/", homeController.getIndex);


module.exports = homeRoutes;