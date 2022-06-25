const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const Ticket = sequelize.define("ticket", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    severity: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
})

module.exports = Ticket;