const Task = require('../../models/task/task.model');
const User = require('../../models/user/user.model');
const { formatDate, getCompletedTasks } = require('../../utils/util');

function getIndex(req, res, next) {
	res.render('tasks/tasks');
}

function getTasks(req, res, next) {
	const formattedTasks = [];
	let completedTasks = 0;
	Task.find({ pending: false })
		.sort({ createdAt: -1 })
		.then((tasks) => {
			for (let task of tasks) {
				completedTasks = getCompletedTasks(tasks);
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
				console.log(formattedTasks)
			}
		})
		.then((result) => {
			res.render('tasks/tasks', {
				tasks: formattedTasks,
				taskCount: completedTasks,
				title: 'All Tasks',
			});
		});
}

function getCurrentUsersTasks(req, res, next) {
	const formattedTasks = [];
	let completedTasks = 0;
	Task.find({ assingedTo: req.user._id, pending: false  })
		.sort({ createdAt: -1 })
		.then((tasks) => {
			for (let task of tasks) {
				completedTasks = getCompletedTasks(tasks);
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
			res.render('tasks/tasks', {
				tasks: formattedTasks,
				taskCount: completedTasks,
				title: 'My Tasks',
			});
		});
}

function getUrgentTasks(req, res, next) {
	const formattedTasks = [];
	let completedTasks = 0;
	Task.find({ severity: 'urgent', pending: false  })
		.sort({ createdAt: -1 })
		.then((tasks) => {
			for (let task of tasks) {
				completedTasks = getCompletedTasks(tasks);
				const formattedDate = formatDate(task.createdAt);
				const formattedTask = {
					...task,
					createdAt: formattedDate,
				};
				formattedTasks.push(formattedTask);
			}
		})
		.then((result) => {
			res.render('tasks/tasks', {
				tasks: formattedTasks,
				taskCount: completedTasks,
				title: 'Urgent Tasks',
			});
		});
}

function getModerateTasks(req, res, next) {
	const formattedTasks = [];
	let completedTasks = 0;
	Task.find({ severity: 'moderate', pending: false  })
		.sort({ createdAt: -1 })
		.then((tasks) => {
			for (let task of tasks) {
				completedTasks = getCompletedTasks(tasks);
				const formattedDate = formatDate(task.createdAt);
				const formattedTask = {
					...task,
					createdAt: formattedDate,
				};
				formattedTasks.push(formattedTask);
			}
		})
		.then((result) => {
			res.render('tasks/tasks', {
				tasks: formattedTasks,
				taskCount: completedTasks,
				title: 'Moderate Tasks',
			});
		});
}

function getMinorTasks(req, res, next) {
	const formattedTasks = [];
	let completedTasks = 0;
	Task.find({ severity: 'minor', pending: false  })
		.sort({ createdAt: -1 })
		.then((tasks) => {
			for (let task of tasks) {
				completedTasks = getCompletedTasks(tasks);
				const formattedDate = formatDate(task.createdAt);
				const formattedTask = {
					...task,
					createdAt: formattedDate,
				};
				formattedTasks.push(formattedTask);
			}
		})
		.then((result) => {
			res.render('tasks/tasks', {
				tasks: formattedTasks,
				taskCount: completedTasks,
				title: 'Minor Tasks',
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
	let foundTask = {};

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

	task.completed = true;

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
	getUrgentTasks,
	getModerateTasks,
	getMinorTasks,
	getTask,
	getCreateTask,
	postCreateTask,
	getEditTask,
	postEditTask,
	postDeleteTask,
	postCompleteTask,
	postTaskForReview
};
