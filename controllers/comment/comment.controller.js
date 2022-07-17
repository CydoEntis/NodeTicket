const Comment = require("../../models/comment/comment.model");

async function postComment(req, res, next) {
	const comment = new Comment({
		comment: req.body.comment,
		createdBy: {
			username: req.user.username,
			userId: req.user
		},
    taskId: req.body.id
	});

	comment.save().then((result) => {
		res.redirect('/task/' + req.body.id);
	});
}

module.exports = {
	postComment,
}