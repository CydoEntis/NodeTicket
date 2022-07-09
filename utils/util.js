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

function getCompletedTickets(tickets) {
	let completedTickets = 0;
	for(let ticket of tickets) {
		if(ticket._doc.completed) {
			completedTickets += 1;
		}
	}
	return completedTickets;
}

module.exports = {
  formatDate,
	getCompletedTickets,
}