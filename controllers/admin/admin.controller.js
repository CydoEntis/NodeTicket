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

async function getActiveTasks(req, res, next) {
	const formattedTasks = [];
	const tasks = await Task.find({status: 'active'}).sort({createdAt: -1});
	for (let task of tasks) {

		const formattedDate = formatDate(task.createdAt);

		const formattedTask = {
			...task,
			createdAt: formattedDate,
		};
		formattedTasks.push(formattedTask);
	}

	res.render('admin/admin-panel', {
		tasks: formattedTasks,
		title: "Active"
	});
}

async function getHoldTasks(req, res, next) {
	const formattedTasks = [];
	const tasks = await Task.find({status: "hold"}).sort({createdAt: -1});
	for (let task of tasks) {
		const formattedDate = formatDate(task.createdAt);

		const formattedTask = {
			...task,
			createdAt: formattedDate,
		};
		formattedTasks.push(formattedTask);
	}

	res.render('admin/admin-panel', {
		tasks: formattedTasks,
		title: "Hold"
	});
}

async function getReviewingTasks(req, res, next) {
	const formattedTasks = [];
	const tasks = await Task.find({status: "reviewing"}).sort({createdAt: -1});
	for (let task of tasks) {
		const formattedDate = formatDate(task.createdAt);

		const formattedTask = {
			...task,
			createdAt: formattedDate,
		};
		formattedTasks.push(formattedTask);
	}

	res.render('admin/admin-panel', {
		tasks: formattedTasks,
		title: "Review"
	});
}

async function getCompletedTasks(req, res, next) {
	const formattedTasks = [];
	const tasks = await Task.find({status: "complete"}).sort({createdAt: -1});
	for (let task of tasks) {
		const formattedDate = formatDate(task.createdAt);

		const formattedTask = {
			...task,
			createdAt: formattedDate,
		};
		formattedTasks.push(formattedTask);
	}

	res.render('admin/admin-panel', {
		tasks: formattedTasks,
		title: "Completed"
	});
}

module.exports = {
	getAdminPanel,
	getActiveTasks,
	getHoldTasks,
	getReviewingTasks,
	getCompletedTasks
};
