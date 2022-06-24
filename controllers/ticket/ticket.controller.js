// const Ticket = require("../../models");

function getIndex(req, res, next) {
    // TODO: Get all tickets
    res.render("tickets/all-tickets")
}

module.exports = {
    getIndex
}