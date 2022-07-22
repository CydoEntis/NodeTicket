const Task = require('../../models/task/task.model');

const { formatDate } = require('../../utils/util');

async function getDashboard(req, res, next) {
	const user = req.user;
	let activeTasks = 0;
	let onHoldTasks = 0;
	let completedTasks = 0;

	const tasks = await Task.find({ assingedTo: req.user._id });

	for (let task of tasks) {
		if(task.status === "complete") {
			completedTasks++;
		} else if (task.status === "hold") {
			onHoldTasks++;
		} else if (task.status === "active") {
			activeTasks++;
		}
	}

	res.render('dashboard/dashboard', {
		tasks: tasks,
		user: user,
		activeTasks: activeTasks,
		onHoldTasks: onHoldTasks,
		completedTasks: completedTasks,
		activePage: '/dashboard'
	});
}

async function getWeeklyTasks(req, res, next) {
	const today = new Date();
	const day = today.getDate();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;

	const pastWeeksTasks = await Task.find({ assingedTo: req.user._id,  createdAt: {$gte: new Date(`${year}-${month}-${day - 7}`).toISOString(), $lte: new Date(`${year}-${month}-${day}`).toISOString()}});

	const weeklyTasks = {};
	for(let i = 7; i >= 0; i--) {
		weeklyTasks[day - i] = 0;
	}

	for(let task of pastWeeksTasks) {
		let taskDate = new Date(task.createdAt);
		let taskDateDay = taskDate.getDate();
		for(let day in weeklyTasks) {
			if(taskDateDay === +day) {
				weeklyTasks[day] += 1;
			}
		}
	}
	res.json(weeklyTasks);
}

module.exports = {
	getDashboard,
	getWeeklyTasks
};
