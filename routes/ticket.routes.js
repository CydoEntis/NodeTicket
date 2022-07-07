const express = require("express");

const ticketController = require("../controllers/ticket/ticket.controller")

const ticketRoutes = express.Router();

ticketRoutes.get("/", ticketController.getIndex);
ticketRoutes.get("/all-tickets", ticketController.getTickets);
ticketRoutes.get("/my-tickets", ticketController.getCurrentUsersTickets);
ticketRoutes.get("/urgent-tickets", ticketController.getUrgentTickets);
ticketRoutes.get("/moderate-tickets", ticketController.getModerateTickets);
ticketRoutes.get("/minor-tickets", ticketController.getMinorTickets);
ticketRoutes.get("/ticket-details/:id", ticketController.getTicket);
ticketRoutes.get("/add-ticket", ticketController.getAddTicket);
ticketRoutes.post("/add-ticket", ticketController.postAddTicket);
ticketRoutes.get("/edit-ticket/:id", ticketController.getEditTicket);
ticketRoutes.post("/edit-ticket", ticketController.postEditTicket)
ticketRoutes.post("/delete-ticket", ticketController.postDeleteTicket);

module.exports = ticketRoutes;

