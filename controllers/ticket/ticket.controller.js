// const Ticket = require("../../models");

function getIndex(req, res, next) {
    // TODO: Get all tickets
    res.render("dashboard")
}

module.exports = {
    getIndex
}