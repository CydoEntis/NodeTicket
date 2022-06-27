const express = require("express");

const dashboardController = require("../controllers/dashboard/dashboard.controller")

const dashboardRoutes = express.Router();

dashboardRoutes.get("/", dashboardController.getDashboard);

module.exports = dashboardRoutes;