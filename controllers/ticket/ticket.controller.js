const Ticket = require('../../models/ticket.model');
const User = require('../../models/user/user.model');
const { formatDate, getCompletedTickets } = require('../../utils/util');

function getIndex(req, res, next) {
	res.render('tickets/all-tickets');
}

function getTickets(req, res, next) {
	const formattedTickets = [];
	let completedTickets = 0;
	Ticket.find({ pending: false })
		.sort({ createdAt: -1 })
		.then((tickets) => {
			for (let ticket of tickets) {
				completedTickets = getCompletedTickets(tickets);
				const formattedDate = formatDate(ticket.createdAt);
				const formattedTicket = {
					...ticket,
					createdAt: formattedDate,
				};
				formattedTickets.push(formattedTicket);
			}
		})
		.then((result) => {
			res.render('tickets/tickets', {
				tickets: formattedTickets,
				ticketCount: completedTickets,
				title: 'All Tickets',
			});
		});
}

function getCurrentUsersTickets(req, res, next) {
	const formattedTickets = [];
	let completedTickets = 0;
	Ticket.find({ assingedTo: req.user._id, pending: false  })
		.sort({ createdAt: -1 })
		.then((tickets) => {
			for (let ticket of tickets) {
				completedTickets = getCompletedTickets(tickets);
				const formattedDate = formatDate(ticket.createdAt);
				const formattedTicket = {
					...ticket,
					createdAt: formattedDate,
				};
				formattedTickets.push(formattedTicket);
			}
			console.log("Ticket Count", tickets.length)
		})
		.then((result) => {
			res.render('tickets/tickets', {
				tickets: formattedTickets,
				ticketCount: completedTickets,
				title: 'My Tickets',
			});
		});
}

function getUrgentTickets(req, res, next) {
	const formattedTickets = [];
	let completedTickets = 0;
	Ticket.find({ severity: 'urgent', pending: false  })
		.sort({ createdAt: -1 })
		.then((tickets) => {
			for (let ticket of tickets) {
				completedTickets = getCompletedTickets(tickets);
				const formattedDate = formatDate(ticket.createdAt);
				const formattedTicket = {
					...ticket,
					createdAt: formattedDate,
				};
				formattedTickets.push(formattedTicket);
			}
		})
		.then((result) => {
			res.render('tickets/tickets', {
				tickets: formattedTickets,
				ticketCount: completedTickets,
				title: 'Urgent Tickets',
			});
		});
}

function getModerateTickets(req, res, next) {
	const formattedTickets = [];
	let completedTickets = 0;
	Ticket.find({ severity: 'moderate', pending: false  })
		.sort({ createdAt: -1 })
		.then((tickets) => {
			for (let ticket of tickets) {
				completedTickets = getCompletedTickets(tickets);
				const formattedDate = formatDate(ticket.createdAt);
				const formattedTicket = {
					...ticket,
					createdAt: formattedDate,
				};
				formattedTickets.push(formattedTicket);
			}
		})
		.then((result) => {
			res.render('tickets/tickets', {
				tickets: formattedTickets,
				ticketCount: completedTickets,
				title: 'Moderate Tickets',
			});
		});
}

function getMinorTickets(req, res, next) {
	const formattedTickets = [];
	let completedTickets = 0;
	Ticket.find({ severity: 'minor', pending: false  })
		.sort({ createdAt: -1 })
		.then((tickets) => {
			for (let ticket of tickets) {
				completedTickets = getCompletedTickets(tickets);
				const formattedDate = formatDate(ticket.createdAt);
				const formattedTicket = {
					...ticket,
					createdAt: formattedDate,
				};
				formattedTickets.push(formattedTicket);
			}
		})
		.then((result) => {
			res.render('tickets/tickets', {
				tickets: formattedTickets,
				ticketCount: completedTickets,
				title: 'Minor Tickets',
			});
		});
}

function getTicket(req, res, next) {
	const ticketId = req.params.id;

	Ticket.findById(ticketId)
		.then((ticket) => {
			const formattedDate = formatDate(ticket.createdAt);
			const foundTicket = {
				...ticket,
				// ...ticket.dataValues,
				createdAt: formattedDate,
			};
			res.render('tickets/ticket-details', {
				ticket: foundTicket,
			});
		})
		.catch((err) => console.error(err));
}

function getAddTicket(req, res, next) {
	res.render('tickets/add-ticket');
}

function postAddTicket(req, res, next) {
	const title = req.body.title;
	const description = req.body.description;

	const ticket = new Ticket({
		title: title,
		severity: undefined,
		description: description,
		createdBy: req.user,
	});

	ticket.save().then((result) => {
		res.redirect('/all-tickets');
	});
}

function getEditTicket(req, res, next) {
	const ticketId = req.params.id;
	let foundTicket = {};

	Ticket.findById(ticketId)
		.then((ticket) => {
			const formattedDate = formatDate(ticket.createdAt);
			const foundTicket = {
				...ticket,
				createdAt: formattedDate,
			};
			User.find({ role: 'user' }).then((users) => {
				res.render('tickets/edit-ticket', {
					ticket: foundTicket,
					users: users,
				});
			});
		})
		.catch((err) => console.error(err));
}

async function postEditTicket(req, res, next) {
	const ticketId = req.body.id;
	const updatedTitle = req.body.title;
	const updatedDescription = req.body.description;
	const severity = req.body.severity;
	const assignedTo = req.body.user;

	const ticket = await Ticket.findById(ticketId);

	ticket.title = updatedTitle;
	ticket.description = updatedDescription;
	ticket.severity = severity;
	ticket.assignedTo = assignedTo;
	ticket.pending = false;

	await ticket.save();

	res.redirect('/admin');

}

function postDeleteTicket(req, res, next) {
	const ticketId = req.body.id;
	Ticket.deleteOne({ _id: ticketId })
		.then(() => {
			console.log('Ticket deleted');
			res.redirect('/all-tickets');
		})
		.catch((err) => console.error(err));
	// Test 2
}

async function postCompleteTicket(req, res, next) {
	const ticketId = req.body.id;
	const ticket = await Ticket.findById(ticketId);

	ticket.completed = true;

	await ticket.save();

	res.redirect('/admin');
}

module.exports = {
	getIndex,
	getTickets,
	getCurrentUsersTickets,
	getUrgentTickets,
	getModerateTickets,
	getMinorTickets,
	getTicket,
	getAddTicket,
	postAddTicket,
	getEditTicket,
	postEditTicket,
	postDeleteTicket,
	postCompleteTicket,
};
