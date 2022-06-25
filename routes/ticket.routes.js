const express = require("express");

const ticketController = require("../controllers/ticket/ticket.controller")

const ticketRoutes = express.Router();

ticketRoutes.get("/", ticketController.getIndex);
ticketRoutes.get("/all-tickets", ticketController.getTickets);
ticketRoutes.get("/ticket-details/:id", ticketController.getTicket);
ticketRoutes.get("/add-ticket", ticketController.getAddTicket);
ticketRoutes.post("/add-ticket", ticketController.postAddTicket);
ticketRoutes.get("/edit-ticket/:id", ticketController.getEditTicket);
ticketRoutes.post("/edit-ticket", ticketController.postEditTicket)


module.exports = ticketRoutes;

