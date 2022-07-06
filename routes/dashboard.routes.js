const express = require("express");

const dashboardController = require("../controllers/dashboard/dashboard.controller")

const dashboardRoutes = express.Router();

dashboardRoutes.get("/dashboard", dashboardController.getDashboard);

module.exports = dashboardRoutes;