const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		severity: {
			type: String,
		},
		description: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		assignedTo: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		pending: {
			type: Boolean,
			default: true,
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
		isReviewing: {
			type: Boolean
		},
		isOnHold: {
			type: Boolean
		}
	},
	// {
	// 	timestamps: true,
	// }
);

module.exports = mongoose.model('Task', taskSchema);
