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

async function getAdminEditTask(req, res, next) {
	const taskId = req.params.id;

	let foundTask = {};
	try {
		const task = await Task.findById(taskId);
		const users = await User.find({role: 'user'});
		const formattedDate = formatDate(task.createdAt);

		foundTask = {
			...task,
			createdAt: formattedDate,
		};

		console.log(foundTask);
		res.render('admin/admin-edit', {
			task: foundTask,
			user: req.user,
			users: users,
			errorMessage: null,
			validationErrors: []
		});

	} catch(e) {
		console.log(e);
	}
}

async function postAdminEditTask(req, res, next) {
	const taskId = req.body.id;
	const updatedTitle = req.body.title;
	const updatedDescription = req.body.description;
	const errors = validationResult(req);

	try {
		const task = await Task.findById(taskId);

		if(!errors.isEmpty()) {
			return res.status(422).render('admin/admin-edit', {
				pageTitle: 'Edit Task',
				task: {
					_doc: {
						title: updatedTitle,
						description: updatedDescription,
						status: "edited",
						createdBy: task.createdBy,
						assignedTo: task.assignedTo,
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

module.exports = {
	getAdminPanel,
	getActiveTasks,
	getHoldTasks,
	getReviewingTasks,
	getCompletedTasks,
	getAdminEditTask,
	postAdminEditTask,
};
