const express = require("express");

const ticketController = require("../controllers/ticket/ticket.controller")

const ticketRoutes = express.Router();

ticketRoutes.get("/", ticketController.getIndex);


module.exports = ticketRoutes;

