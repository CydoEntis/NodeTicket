const Ticket = require('../../models/ticket.model');
const User = require('../../models/user/user.model');

const { formatDate } = require('../../utils/util');

async function getAdminPanel(req, res, next) {
	const formattedTickets = [];
	const tickets = await Ticket.find();
	for (let ticket of tickets) {
    const user = await User.find({_id: ticket.createdBy})
    // console.log(user);
    // const user = await User.find({_id: ticket.createdBy});

		const formattedDate = formatDate(ticket.createdAt);

		const formattedTicket = {
			...ticket,
			createdAt: formattedDate,
      createdBy: user[0].username,
		};
		formattedTickets.push(formattedTicket);
	}

	if (req.user.role === 'admin') {
		res.render('admin/admin-panel', {
			tickets: formattedTickets,
		});
	} else {
		// TODO Add actual route protection.
		res.redirect('/dashboard');
		console.log('Access denied');
	}
}

module.exports = {
	getAdminPanel,
};
