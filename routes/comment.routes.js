const express = require("express");

const commentController = require("../controllers/comment/comment.controller")

const commentRoutes = express.Router();

commentRoutes.post("/post-comment", commentController.postComment);

module.exports = commentRoutes;