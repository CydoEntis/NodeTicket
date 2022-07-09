const mongoose = require('mongoose');
const userModel = require('./user/user.model');

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
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
		completed: {
			type: Boolean,
			default: false,
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
		pending: {
			type: Boolean,
			default: true,
		},
		assignedTo: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		}
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Ticket', ticketSchema);
