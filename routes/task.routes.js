const express = require("express");

const taskController = require("../controllers/task/task.controller")

const taskRoutes = express.Router();

taskRoutes.get("/tasks", taskController.getIndex);
taskRoutes.get("/tasks/all", taskController.getTasks);

taskRoutes.get("/create-task", taskController.getCreateTask);
taskRoutes.post("/create-task", taskController.postCreateTask);

taskRoutes.post("/assign-task", taskController.postAssignTask);

taskRoutes.get("/tasks/active", taskController.getActiveTasks);
taskRoutes.post("/task/set-active", taskController.postActiveTask);

taskRoutes.post("/task/submit-for-review", taskController.postTaskForReview);

taskRoutes.get("/tasks/on-hold", taskController.getHoldTasks);
taskRoutes.post("/task/set-on-hold", taskController.postHoldTask);

taskRoutes.get("/tasks/complete", taskController.getCompletedTasks);
taskRoutes.post("/task/complete-task", taskController.postCompleteTask);

taskRoutes.get("/task/:id", taskController.getTask);

//TODO: Not re-implemented
taskRoutes.get("/edit-task/:id", taskController.getEditTask);
taskRoutes.post("/edit-task", taskController.postEditTask)
taskRoutes.post("/delete-task", taskController.postDeleteTask);

module.exports = taskRoutes;

