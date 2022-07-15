const express = require("express");

const taskController = require("../controllers/task/task.controller")

const taskRoutes = express.Router();

taskRoutes.get("/tasks", taskController.getIndex);
taskRoutes.get("/tasks/all", taskController.getTasks);
taskRoutes.get("/create-task", taskController.getCreateTask);
taskRoutes.post("/create-task", taskController.postCreateTask);
taskRoutes.post("/assign-task", taskController.postAssignTask);


taskRoutes.get("/tasks/mine", taskController.getCurrentUsersTasks);
taskRoutes.get("/task/active", taskController.getActiveTasks);
taskRoutes.post("/task/set-active", taskController.postActiveTask);
taskRoutes.get("/task/on-hold", taskController.getHoldTasks);
taskRoutes.post("/task/set-on-hold", taskController.postHoldTask);
taskRoutes.get("/tasks/complete", taskController.getCompletedTasks);
taskRoutes.get("/task/:id", taskController.getTask);
taskRoutes.get("/edit-task/:id", taskController.getEditTask);
taskRoutes.post("/edit-task", taskController.postEditTask)
taskRoutes.post("/delete-task", taskController.postDeleteTask);
taskRoutes.post("/task/complete-task", taskController.postCompleteTask);
taskRoutes.post("/task/submit-for-review", taskController.postTaskForReview);

module.exports = taskRoutes;

