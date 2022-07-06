// const Ticket = require("../../models");

const Ticket = require('../../models/ticket.model');

function formatDate(date) {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const currDate = new Date(date);
	let month = months[currDate.getMonth()];
	let year = currDate.getFullYear();
	let day = currDate.getDate();
	return `${month} ${day}, ${year}`;
}

function getIndex(req, res, next) {
	res.render('tickets/all-tickets');
}

function getTickets(req, res, next) {
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
		})
		.then((result) => {
			res.render('tickets/all-tickets', {
				tickets: formattedTickets,
			});
		});
}

function getUrgentTickets(req, res, next) {
	//TODO: Get all the urgent tickets
}

function getMyTickets(req, res, next) {
	//TODO: Get all the tickets for current user
	// Test
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
	const severity = req.body.severity;
	const description = req.body.description;

	const ticket = new Ticket({
		title: title,
		severity: severity,
		description: description,
	});

	ticket.save().then((result) => {
		res.redirect('/all-tickets');
	});
}

function getEditTicket(req, res, next) {
	const ticketId = req.params.id;

	Ticket.findById(ticketId)
		.then((ticket) => {
			const formattedDate = formatDate(ticket.createdAt);
			const foundTicket = {
				...ticket,
				createdAt: formattedDate,
			};
			res.render('tickets/edit-ticket', {
				ticket: foundTicket,
			});
		})
		.catch((err) => console.error(err));
}

function postEditTicket(req, res, next) {
	const ticketId = req.body.id;
	const updatedTitle = req.body.title;
	const updatedSeverity = req.body.severity;
	const updatedDescription = req.body.description;

	Ticket.findById(ticketId)
		.then((ticket) => {
			ticket.title = updatedTitle;
			ticket.severity = updatedSeverity;
			ticket.description = updatedDescription;
			return ticket.save().then(() => {
				console.log('Updated ticket');
				res.redirect('/all-tickets');
			});
		})
		.catch((err) => console.log(err));
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

module.exports = {
	getIndex,
	getTickets,
	getTicket,
	getAddTicket,
	postAddTicket,
	getEditTicket,
	postEditTicket,
	postDeleteTicket,
};
