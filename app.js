const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dashboardRoutes = require('./routes/dashboard.routes');

const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
const flash = require('connect-flash');

const User = require("./models/user/user.model");
const taskRoutes = require('./routes/task.routes');
const homeRoutes = require('./routes/home.routes');
const adminRoutes = require('./routes/admin.routes');
const commentRoutes = require('./routes/comment.routes');

const MONGODB_URI =
	'mongodb+srv://admin:Gt6MNcd63yKs4HTr@trackr.senitct.mongodb.net/tickets';

const app = express();

const store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: 'sessions',
});

const csrfProtection = csurf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		secret: 'sesh',
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

app.use(csrfProtection);
app.use(flash())

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	res.locals.isAdmin = req.session.isAdmin;
	res.locals.csrfToken = req.csrfToken();
	next();
});

app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}

	User.findById(req.session.user._id)
		.then((user) => {
			if (!user) {
				return next();
			}

			req.user = user;
			next();
		})
		.catch((err) => {
			console.log(err);
		});
});

app.use('/', authRoutes);
app.use('/', homeRoutes);
app.use('/', adminRoutes);
app.use('/', dashboardRoutes);
app.use('/', taskRoutes);
app.use('/', commentRoutes);


mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(3000);
	})
	.catch((err) => console.log(err));
