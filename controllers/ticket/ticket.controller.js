// const Ticket = require("../../models");

function getIndex(req, res, next) {
    // TODO: Get all tickets
    res.render("index")
}

module.exports = {
    getIndex
}