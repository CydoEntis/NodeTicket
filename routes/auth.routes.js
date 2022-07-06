const express = require("express");

const authController = require("../controllers/auth/auth.controller")

const authRoutes = express.Router();

authRoutes.get("/login", authController.getLogin);
authRoutes.post("/login", authController.postLogin);
authRoutes.get("/signup", authController.getSignUp);
authRoutes.post("/signup", authController.postSignUp);

module.exports = authRoutes;