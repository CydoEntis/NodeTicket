const express = require('express');
const { body } = require('express-validator');

const taskController = require('../controllers/task/task.controller');
const { isAuth } = require('../middleware/auth.middleware');

const taskRoutes = express.Router();

taskRoutes.use(isAuth);

taskRoutes.get('/tasks', taskController.getIndex);
taskRoutes.get('/tasks/all', taskController.getTasks);

taskRoutes.get('/create-task', taskController.getCreateTask);
taskRoutes.post(
	'/create-task',
	[
		body('title', "Please enter a title").isString().isLength({ min: 3 }).trim(),
		body('description', "Please enter a description").isString().isLength({ min: 5, max: 200 }).trim(),
	],
	taskController.postCreateTask
);

taskRoutes.post('/assign-task', taskController.postAssignTask);

taskRoutes.get('/tasks/active', taskController.getActiveTasks);
taskRoutes.post('/task/set-active', taskController.postActiveTask);

taskRoutes.post('/task/submit-for-review', taskController.postTaskForReview);

taskRoutes.get('/tasks/on-hold', taskController.getHoldTasks);
taskRoutes.post('/task/set-on-hold', taskController.postHoldTask);

taskRoutes.get('/tasks/complete', taskController.getCompletedTasks);
taskRoutes.post('/task/complete-task', taskController.postCompleteTask);

taskRoutes.get('/task/:id', taskController.getTask);

taskRoutes.get(
	'/edit-task/:id',
	taskController.getUserEditTask
);

taskRoutes.post('/edit-task', 
[
	body('title', "Please enter a title").isString().isLength({ min: 3 }).trim(),
	body('description', "Please enter a description").isString().isLength({ min: 5, max: 200 }).trim(),
	// body('priority').not().isEmpty(),
	// body('userInfo').not().isEmpty()
],
taskController.postUserEditTask);

//TODO: Not re-implemented
taskRoutes.post('/delete-task', taskController.postDeleteTask);

module.exports = taskRoutes;
