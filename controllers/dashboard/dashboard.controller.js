const Ticket = require('../../models/ticket.model');

const { formatDate } = require("../../utils/util");

function getDashboard(req, res, next) {
    const user = req.user;
    console.log(user);
    const formattedTickets = [];
	Ticket.find()
		.then((tickets) => {
			console.log(tickets);
			for (let ticket of tickets) {
				const formattedDate = formatDate(ticket.createdAt);
				const formattedTicket = {
					...ticket,
					createdAt: formattedDate,
				};
				formattedTickets.push(formattedTicket);
			}
            console.log(formattedTickets)
		})
		.then((result) => {
			res.render('dashboard/dashboard', {
				tickets: formattedTickets,
                user: user
			});
		});
}

module.exports = {
	getDashboard,
};
