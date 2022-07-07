const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		severity: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Ticket', ticketSchema);
