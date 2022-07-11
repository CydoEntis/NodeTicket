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

function getCompletedTasks(tasks) {
	let completedTasks = 0;
	for(let task of tasks) {
		if(task._doc.completed) {
			completedTasks += 1;
		}
	}
	return completedTasks;
}

module.exports = {
  formatDate,
	getCompletedTasks,
}