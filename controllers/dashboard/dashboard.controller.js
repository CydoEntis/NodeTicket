const Ticket = require('../../models/task/task.model');

const { formatDate } = require('../../utils/util');

async function getDashboard(req, res, next) {
	const user = req.user;
	const formattedTickets = [];
	let myTicketCount = 0;
	const today = new Date();
	const day = today.getDate();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;

	const weeklyTickets = await Ticket.find({ assingedTo: req.user._id,  createdAt: {$gte: new Date(`${year}-${month}-${day - 7}`).toISOString(), $lte: new Date(`${year}-${month}-${day}`).toISOString()}});

	const weeklyTicketCounts = [];


	// const pastDays = [];
	// for(let i = 7; i >= 0; i--) {
	// 	let day = date - i;
	// 	pastDays.push(month + "/" + day + "/" + year);
	// }

	// for(let ticket of weeklyTickets) {
	// 	for(let day of pastDays) {
	// 		if()
	// 	}
	// }

	const tickets = await Ticket.find({ assingedTo: req.user._id });


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

	res.render('dashboard/dashboard', {
		tickets: formattedTickets,
		user: user,
		myTicketCount: myTicketCount,
		activePage: 'dashboard'
	});
}

module.exports = {
	getDashboard,
};
