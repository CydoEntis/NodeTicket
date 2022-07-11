const Ticket = require('../../models/task/task.model');

const { formatDate } = require('../../utils/util');

function getDashboard(req, res, next) {
	const user = req.user;
	const formattedTickets = [];
	let myTicketCount = 0;
	Ticket.find({ assingedTo: req.user._id })
		.then((tickets) => {
			for (let ticket of tickets) {
				if(ticket._doc._id === user._id) {
					myTicketCount += 1;
				}
				const formattedDate = formatDate(ticket.createdAt);
				const formattedTicket = {
					...ticket,
					createdAt: formattedDate,
				};
				formattedTickets.push(formattedTicket);
			}
			console.log("Ticket Count", myTicketCount)
		})
		.then((result) => {
			res.render('dashboard/dashboard', {
				tickets: formattedTickets,
				user: user,
				myTicketCount: myTicketCount
			});
		});
}

module.exports = {
	getDashboard,
};
