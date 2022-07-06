const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ticketRoutes = require('./routes/ticket.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const mongoose = require('mongoose');

const MONGODB_URI =
	'mongodb+srv://admin:Gt6MNcd63yKs4HTr@trackr.senitct.mongodb.net/tickets';

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dashboardRoutes);
app.use('/', ticketRoutes);

mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(3000);
	})
	.catch((err) => console.log(err));
