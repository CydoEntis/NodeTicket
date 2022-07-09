const Ticket = require('../../models/ticket.model');
const User = require('../../models/user/user.model');

const { formatDate } = require('../../utils/util');

async function getAdminPanel(req, res, next) {
	const formattedTickets = [];
	const tickets = await Ticket.find().sort({createdAt: -1}).limit(20);
	for (let ticket of tickets) {

		const formattedDate = formatDate(ticket.createdAt);

		const formattedTicket = {
			...ticket,
			createdAt: formattedDate,
		};
		formattedTickets.push(formattedTicket);
	}
	console.log(formattedTickets.length)
	res.render('admin/admin-panel', {
		tickets: formattedTickets,
	});
}

async function getPendingTickets(req, res, next) {
	const formattedTickets = [];
	const tickets = await Ticket.find({pending: true}).sort({createdAt: -1});
	for (let ticket of tickets) {
		const user = await User.find({ _id: ticket.createdBy });

		const formattedDate = formatDate(ticket.createdAt);

		const formattedTicket = {
			...ticket,
			createdAt: formattedDate,
			createdBy: user[0].username,
		};
		formattedTickets.push(formattedTicket);
	}

	res.render('admin/admin-ticket-review', {
		tickets: formattedTickets,
	});
}

async function getAssignedTickets(req, res, next) {
	const formattedTickets = [];
	const tickets = await Ticket.find({pending: false}).sort({createdAt: -1});
	for (let ticket of tickets) {
		const createdBy = await User.find({ _id: ticket.createdBy });
		const assignedTo = await User.find({ _id: ticket.assignedTo });

		const formattedDate = formatDate(ticket.createdAt);

		const formattedTicket = {
			...ticket,
			createdAt: formattedDate,
			createdBy: createdBy[0].username,
			assingedTo: assignedTo[0].username,
		};
		formattedTickets.push(formattedTicket);
	}

	res.render('admin/admin-ticket-review', {
		tickets: formattedTickets,
	});
}

async function getCompletedTickets(req, res, next) {
	const formattedTickets = [];
	const tickets = await Ticket.find({completed: true}).sort({createdAt: -1});
	for (let ticket of tickets) {
		const createdBy = await User.find({ _id: ticket.createdBy });
		const assignedTo = await User.find({ _id: ticket.assignedTo });

		const formattedDate = formatDate(ticket.createdAt);

		const formattedTicket = {
			...ticket,
			createdAt: formattedDate,
			createdBy: createdBy[0].username,
			assingedTo: assignedTo[0].username,
		};
		formattedTickets.push(formattedTicket);
	}

	res.render('admin/admin-ticket-review', {
		tickets: formattedTickets,
	});
}

module.exports = {
	getAdminPanel,
	getPendingTickets,
	getAssignedTickets,
	getCompletedTickets
};
