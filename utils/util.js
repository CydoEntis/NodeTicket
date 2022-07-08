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

module.exports = {
  formatDate
}