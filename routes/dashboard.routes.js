const express = require("express");

const dashboardController = require("../controllers/dashboard/dashboard.controller");
const { isAuth } = require("../middleware/auth.middleware");

const dashboardRoutes = express.Router();

dashboardRoutes.get("/dashboard", isAuth, dashboardController.getDashboard);
dashboardRoutes.get("/weeklyTasks", isAuth, dashboardController.getWeeklyTasks);

module.exports = dashboardRoutes;