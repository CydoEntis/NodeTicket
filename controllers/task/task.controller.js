const ObjectId = require('mongodb').ObjectId;

const taskModel = require('../../models/task/task.model');
const Task = require('../../models/task/task.model');
const User = require('../../models/user/user.model');
const Comment = require("../../models/comment/comment.model");
const { formatDate } = require('../../utils/util');
const { validationResult } = require('express-validator');

function getIndex(req, res, next) {
	const formattedTasks = [];
	let activeTasks = 0;
	let holdTasks = 0;
	let completedTasks = 0;
	// Task.find({ 'assignedTo.userId': ObjectId(req.user._id) } )
	Task.find({ status: { '$ne': 'pending' }})
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
	Task.find({ status: { '$ne': 'pending' }})
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
				title: 'Active',
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
				title: 'Completed',
				userId: req.user._id,
			});
		});
}

async function getTask(req, res, next) {
	const taskId = req.params.id;
	const task = await Task.findById(taskId);
	const comments = await Comment.find({taskId: taskId}).sort({ createdAt: -1 });

	const formattedDate = formatDate(task.createdAt);
	
	const foundTask = {
		...task,
		// ...task.dataValues,
		createdAt: formattedDate,
	};

	const formattedComments = [];

	for(let comment of comments) {
		commentDate = formatDate(comment.createdAt);
		const formattedComment = {
			...comment,
			createdAt: commentDate,
		}
		formattedComments.push(formattedComment);
	}

	res.render('tasks/task', {
		task: foundTask,
		user: req.user,
		comments: formattedComments
	});
}

function getCreateTask(req, res, next) {


	res.render('tasks/create-task' , {
		pageTitle: 'Create Task',
		errorMessage: null,
		validationErrors: []
	});
}

function postCreateTask(req, res, next) {
	const title = req.body.title;
	const description = req.body.description;
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return res.status(422).render('tasks/create-task', {
			pageTitle: 'Create Task',
			title: title,
			severity: undefined,
			description: description,
			createdBy: {
				username: req.user.username,
				userId: req.user,
			},
			status: 'pending',
			errorMessage: errors.array()[0].msg,
			validationErrors: errors.array()
		})
	}

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

async function getUserEditTask(req, res, next) {
	const taskId = req.params.id;

	let foundTask = {};
	try {
		const task = await Task.findById(taskId);
		const formattedDate = formatDate(task.createdAt);

		foundTask = {
			...task,
			createdAt: formattedDate,
		};

		console.log(foundTask)

		res.render('tasks/edit-task', {
			task: foundTask,
			user: req.user,
			errorMessage: null,
			validationErrors: []
		});

	} catch(e) {
		console.log(e);
	}
}

async function postUserEditTask(req, res, next) {
	const taskId = req.body.id;
	const updatedTitle = req.body.title;
	const updatedDescription = req.body.description;
	const errors = validationResult(req);

	try {
		const task = await Task.findById(taskId);

		if(!errors.isEmpty()) {
			return res.status(422).render('tasks/edit-task', {
				pageTitle: 'Edit Task',
				task: {
					_doc: {
						title: updatedTitle,
						description: updatedDescription,
						status: "edited",
						createdBy: task.createdBy,
						_id: task._id
					}
				},
				user: req.user,
				taskId: taskId,
				errorMessage: errors.array()[0].msg,
				validationErrors: errors.array()
			})
		}

		task.title = updatedTitle;
		task.description = updatedDescription;

		await task.save();

		res.redirect('/tasks');
	} catch(e) {
		console.log(e)
	}
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
	getUserEditTask,
	postUserEditTask,
	postDeleteTask,
	postCompleteTask,
	postTaskForReview,
};
