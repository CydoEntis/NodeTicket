const express = require("express");

const taskController = require("../controllers/task/task.controller")

const taskRoutes = express.Router();

taskRoutes.get("/", taskController.getIndex);
taskRoutes.get("/tasks", taskController.getTasks);
taskRoutes.get("/my-tasks", taskController.getCurrentUsersTasks);
taskRoutes.get("/urgent-tasks", taskController.getUrgentTasks);
taskRoutes.get("/moderate-tasks", taskController.getModerateTasks);
taskRoutes.get("/minor-tasks", taskController.getMinorTasks);
taskRoutes.get("/task/:id", taskController.getTask);
taskRoutes.get("/create-task", taskController.getCreateTask);
taskRoutes.post("/create-task", taskController.postCreateTask);
taskRoutes.get("/edit-task/:id", taskController.getEditTask);
taskRoutes.post("/edit-task", taskController.postEditTask)
taskRoutes.post("/delete-task", taskController.postDeleteTask);
taskRoutes.post("/complete-task", taskController.postCompleteTask);
taskRoutes.post("/submit-for-review", taskController.postTaskForReview);

module.exports = taskRoutes;

