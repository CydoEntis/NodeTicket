const ObjectId = require('mongodb').ObjectId;

const taskModel = require('../../models/task/task.model');
const Task = require('../../models/task/task.model');
const User = require('../../models/user/user.model');
const Comment = require("../../models/comment/comment.model");
const { formatDate } = require('../../utils/util');

function getIndex(req, res, next) {
	const formattedTasks = [];
	let activeTasks = 0;
	let holdTasks = 0;
	let completedTasks = 0;
	// Task.find({ 'assignedTo.userId': ObjectId(req.user._id) } )
	Task.find()
		.sort({ createdAt: -1 })
		.then((tasks) => {
			console.log(tasks);
			for (let task of tasks) {
				const formattedDate = formatDate(task.createdAt);
				let formattedDesc = task.description.substring(0, 50);
				if (formattedDesc.length >= 50) {
					formattedDesc += '...';
				}

				if (task.status === 'active') {
					activeTasks += 1;
				} else if (task.status === 'hold') {
					holdTasks += 1;
				} else if (task.status === 'complete') {
					completedTasks += 1;
				}
				const formattedTask = {
					...task,
					createdAt: formattedDate,
					description: formattedDesc,
				};

				formattedTasks.push(formattedTask);
			}
		})
		.then((result) => {
			res.render('tasks/tasks', {
				tasks: formattedTasks,
				title: 'Tasks',
				userId: req.user._id,
				activeTasks: activeTasks,
				holdTasks: holdTasks,
				completedTasks: completedTasks,
			});
		});
}

function getTasks(req, res, next) {
	const formattedTasks = [];
	Task.find({ status: 'active' })
		.sort({ createdAt: -1 })
		.then((tasks) => {
			for (let task of tasks) {
				const formattedDate = formatDate(task.createdAt);
				let formattedDesc = task.description.substring(0, 50);
				if (formattedDesc.length >= 50) {
					formattedDesc += '...';
				}
				const formattedTask = {
					...task,
					createdAt: formattedDate,
					description: formattedDesc,
				};
				formattedTasks.push(formattedTask);
			}
		})
		.then((result) => {
			res.render('tasks/tasks-view', {
				tasks: formattedTasks,
				title: 'All Tasks',
				userId: req.user._id,
			});
		});
}

function getActiveTasks(req, res, next) {
	const formattedTasks = [];
	Task.find({ status: 'active' })
		.sort({ createdAt: -1 })
		.then((tasks) => {
			for (let task of tasks) {
				const formattedDate = formatDate(task.createdAt);
				const formattedTask = {
					...task,
					createdAt: formattedDate,
				};
				formattedTasks.push(formattedTask);
			}
		})
		.then((result) => {
			res.render('tasks/tasks-view', {
				tasks: formattedTasks,
				title: 'In Progress',
				userId: req.user.userId,
			});
		});
}

async function postActiveTask(req, res, next) {
	const taskId = req.body.id;
	const task = await Task.findById(taskId);

	task.status = 'active';

	await task.save();

	res.redirect('/tasks');
}

function getHoldTasks(req, res, next) {
	const formattedTasks = [];
	Task.find({ status: 'hold' })
		.sort({ createdAt: -1 })
		.then((tasks) => {
			for (let task of tasks) {
				const formattedDate = formatDate(task.createdAt);
				const formattedTask = {
					...task,
					createdAt: formattedDate,
				};
				formattedTasks.push(formattedTask);
			}
		})
		.then((result) => {
			res.render('tasks/tasks-view', {
				tasks: formattedTasks,
				title: 'On Hold',
				userId: req.user._id,
			});
		});
}

async function postHoldTask(req, res, next) {
	const taskId = req.body.id;
	const task = await Task.findById(taskId);

	task.status = 'hold';

	await task.save();

	res.redirect('/tasks');
}

function getCompletedTasks(req, res, next) {
	const formattedTasks = [];
	Task.find({ status: 'complete' })
		.sort({ createdAt: -1 })
		.then((tasks) => {
			for (let task of tasks) {
				const formattedDate = formatDate(task.createdAt);
				const formattedTask = {
					...task,
					createdAt: formattedDate,
				};
				formattedTasks.push(formattedTask);
			}
		})
		.then((result) => {
			res.render('tasks/tasks-view', {
				tasks: formattedTasks,
				title: 'Completed',
				userId: req.user._id,
			});
		});
}

async function getTask(req, res, next) {
	const taskId = req.params.id;
	const task = await Task.findById(taskId);
	const comments = await Comment.find({taskId: taskId});

	const formattedDate = formatDate(task.createdAt);
	const foundTask = {
		...task,
		// ...task.dataValues,
		createdAt: formattedDate,
	};

	// console.log(comments);
	console.log(foundTask);

	res.render('tasks/task', {
		task: foundTask,
		user: req.user,
		comments: comments,
	});
}

function getCreateTask(req, res, next) {
	res.render('tasks/create-task');
}

function postCreateTask(req, res, next) {
	const title = req.body.title;
	const description = req.body.description;
	const task = new Task({
		title: title,
		severity: undefined,
		description: description,
		createdBy: {
			username: req.user.username,
			userId: req.user,
		},
		status: 'pending',
	});

	task.save().then((result) => {
		res.redirect('/tasks');
	});
}

async function postAssignTask(req, res, next) {
	const taskId = req.body.id;
	const priority = req.body.priority;

	const userData = req.body.userInfo.split('+');
	const assignedTo = {
		username: userData[0],
		userId: userData[1],
	};

	const task = await Task.findById(taskId);

	task.priority = priority;
	task.assignedTo = assignedTo;
	task.status = 'active';

	await task.save();

	res.redirect('/admin');
}

function getEditTask(req, res, next) {
	const taskId = req.params.id;

	Task.findById(taskId)
		.then((task) => {
			const formattedDate = formatDate(task.createdAt);
			const foundTask = {
				...task,
				createdAt: formattedDate,
			};
			User.find({ role: 'user' }).then((users) => {
				res.render('tasks/edit-task', {
					task: foundTask,
					users: users,
					user: req.user,
				});
			});
		})
		.catch((err) => console.error(err));
}

async function postEditTask(req, res, next) {
	const taskId = req.body.id;
	const updatedTitle = req.body.title;
	const updatedDescription = req.body.description;
	const severity = req.body.severity;

	// const userData = req.body.userInfo.split("+");
	// const assignedTo = {
	// 	username: userData[0],
	// 	userId: userData[1]
	// }

	const task = await Task.findById(taskId);

	task.title = updatedTitle;
	task.description = updatedDescription;
	task.severity = severity;
	// task.assignedTo = assignedTo;

	await task.save();

	res.redirect('/admin');
}

function postDeleteTask(req, res, next) {
	const taskId = req.body.id;
	Task.deleteOne({ _id: taskId })
		.then(() => {
			console.log('Task deleted');
			res.redirect('/all-tasks');
		})
		.catch((err) => console.error(err));
	// Test 2
}

async function postCompleteTask(req, res, next) {
	const taskId = req.body.id;
	const task = await Task.findById(taskId);

	task.status = 'completed';

	await task.save();

	res.redirect('/admin');
}

async function postTaskForReview(req, res, next) {
	const taskId = req.body.id;
	const task = await Task.findById(taskId);

	task.status = 'reviewing';

	await task.save();

	res.redirect('/tasks');
}

module.exports = {
	getIndex,
	getTasks,
	getActiveTasks,
	postActiveTask,
	getHoldTasks,
	postHoldTask,
	getCompletedTasks,
	getTask,
	getCreateTask,
	postCreateTask,
	postAssignTask,
	getEditTask,
	postEditTask,
	postDeleteTask,
	postCompleteTask,
	postTaskForReview,
};
