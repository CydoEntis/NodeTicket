const Task = require('../../models/task/task.model');
const User = require('../../models/user/user.model');

const { formatDate } = require('../../utils/util');

async function getAdminPanel(req, res, next) {
	const formattedTasks = [];
	const tasks = await Task.find().sort({createdAt: -1}).limit(20);
	for (let task of tasks) {
		console.log(task);
		const formattedDate = formatDate(task.createdAt);
		const formattedTask = {
			...task,
			createdAt: formattedDate,
		};
		formattedTasks.push(formattedTask);
	}
	res.render('admin/admin-panel', {
		tasks: formattedTasks,
	});
}

async function getPendingTasks(req, res, next) {
	const formattedTasks = [];
	const tasks = await Task.find({pending: true}).sort({createdAt: -1});
	for (let task of tasks) {
		const user = await User.find({ _id: task.createdBy });

		const formattedDate = formatDate(task.createdAt);

		const formattedTask = {
			...task,
			createdAt: formattedDate,
			createdBy: user[0].username,
		};
		formattedTasks.push(formattedTask);
	}

	res.render('admin/admin-task-review', {
		tasks: formattedTasks,
		title: "Pending"
	});
}

async function getAssignedTasks(req, res, next) {
	const formattedTasks = [];
	const tasks = await Task.find({pending: false}).sort({createdAt: -1});
	for (let task of tasks) {
		const createdBy = await User.find({ _id: task.createdBy });
		const assignedTo = await User.find({ _id: task.assignedTo });
		const formattedDate = formatDate(task.createdAt);

		const formattedTask = {
			...task,
			createdAt: formattedDate,
			createdBy: createdBy[0].username,
			assingedTo: assignedTo[0].username,
		};
		formattedTasks.push(formattedTask);
	}

	res.render('admin/admin-task-review', {
		tasks: formattedTasks,
		title: "Assigned"
	});
}

async function getCompletedTasks(req, res, next) {
	const formattedTasks = [];
	const tasks = await Task.find({completed: true}).sort({createdAt: -1});
	for (let task of tasks) {
		const createdBy = await User.find({ _id: task.createdBy });
		const assignedTo = await User.find({ _id: task.assignedTo });

		const formattedDate = formatDate(task.createdAt);

		const formattedTask = {
			...task,
			createdAt: formattedDate,
			createdBy: createdBy[0].username,
			assingedTo: assignedTo[0].username,
		};
		formattedTasks.push(formattedTask);
	}

	res.render('admin/admin-task-review', {
		tasks: formattedTasks,
		title: "Completed"
	});
}

module.exports = {
	getAdminPanel,
	getPendingTasks,
	getAssignedTasks,
	getCompletedTasks
};
