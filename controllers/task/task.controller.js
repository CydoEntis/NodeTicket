const Task = require('../../models/task/task.model');
const User = require('../../models/user/user.model');
const { formatDate } = require('../../utils/util');

function getIndex(req, res, next) {
	const formattedTasks = [];
	Task.find({ pending: false })
		.sort({ createdAt: -1 })
		.then((tasks) => {
			for (let task of tasks) {
				const formattedDate = formatDate(task.createdAt);
				let formattedDesc = task.description.substring(0, 50);
				if(formattedDesc.length >= 50) {
					formattedDesc += "...";
				}
				const formattedTask = {
					...task,
					createdAt: formattedDate,
					description: formattedDesc
				};
				formattedTasks.push(formattedTask);
			}
			console.log(formattedTasks);
			console.log(req.user._id);
		})
		.then((result) => {
			res.render('tasks/tasks', {
				tasks: formattedTasks,
				title: 'Tasks',
				userId: req.user._id,
			});
		});
}

function getTasks(req, res, next) {
	const formattedTasks = [];
	Task.find({ pending: false })
		.sort({ createdAt: -1 })
		.then((tasks) => {
			for (let task of tasks) {
				const formattedDate = formatDate(task.createdAt);
				let formattedDesc = task.description.substring(0, 50);
				if(formattedDesc.length >= 50) {
					formattedDesc += "...";
				}
				const formattedTask = {
					...task,
					createdAt: formattedDate,
					description: formattedDesc
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

function getCurrentUsersTasks(req, res, next) {
	const formattedTasks = [];
	Task.find({ assingedTo: req.user._id, pending: false  })
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
			console.log("Task Count", tasks.length)
		})
		.then((result) => {
			res.render('tasks/tasks-view', {
				tasks: formattedTasks,
				title: 'My Tasks',
				userId: req.user._id,
			});
		});
}

function getInProgressTasks(req, res, next) {
	const formattedTasks = [];
	Task.find({ inProgress: true, pending: false  })
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
				userId: req.user._id,
			});
		});
}

async function postSetTaskInProgress(req, res, next) {
	const taskId = req.body.id;
	const task = await Task.findById(taskId);
	
	task.isOnHold = false;

	await task.save();

	res.redirect('/tasks');
}

function getOnHoldTasks(req, res, next) {
	const formattedTasks = [];
	Task.find({ isOnHold: true, pending: false  })
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

async function postSetTaskOnHold(req, res, next) {
	const taskId = req.body.id;
	const task = await Task.findById(taskId);
	
	task.isOnHold = true;

	await task.save();

	res.redirect('/tasks');
}

function getCompletedTasks(req, res, next) {
	const formattedTasks = [];
	Task.find({ isComplete: true, pending: false  })
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

function getTask(req, res, next) {
	const taskId = req.params.id;

	Task.findById(taskId)
		.then((task) => {
			const formattedDate = formatDate(task.createdAt);
			const foundTask = {
				...task,
				// ...task.dataValues,
				createdAt: formattedDate,
			};
			res.render('tasks/task', {
				task: foundTask,
				user: req.user,
			});
		})
		.catch((err) => console.error(err));
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
		createdBy: req.user,
	});

	task.save().then((result) => {
		res.redirect('/tasks');
	});
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
	const assignedTo = req.body.user;

	const task = await Task.findById(taskId);


	task.title = updatedTitle;
	task.description = updatedDescription;
	task.severity = severity;
	task.assignedTo = assignedTo;
	task.pending = false;
	task.inProgress = true;

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

	task.isCompleted = true;

	await task.save();

	res.redirect('/admin');
}

async function postTaskForReview(req, res, next) {
	const taskId = req.body.id;
	const task = await Task.findById(taskId);

	task.isReviewing = true;

	await task.save();

	res.redirect('/admin');
}

module.exports = {
	getIndex,
	getTasks,
	getCurrentUsersTasks,
	getInProgressTasks,
	postSetTaskInProgress,
	getOnHoldTasks,
	postSetTaskOnHold,
	getCompletedTasks,
	getTask,
	getCreateTask,
	postCreateTask,
	getEditTask,
	postEditTask,
	postDeleteTask,
	postCompleteTask,
	postTaskForReview
};
