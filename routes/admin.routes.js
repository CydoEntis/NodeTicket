const express = require("express");

const adminController = require("../controllers/admin/admin.controller")

const adminRoutes = express.Router();

adminRoutes.get("/admin", adminController.getAdminPanel);

module.exports = adminRoutes;