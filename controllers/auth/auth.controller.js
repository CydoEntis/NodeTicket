const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../../models/user/user.model');

function getLogin(req, res, next) {
	if(req.session.isLoggedIn) {
		return res.redirect("/dashboard");
	}

	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('auth/login', {
		errorMessage: message,
		oldInput: {
			email: '',
			password: '',
		},
		errors: [],
		activePage: 'login'
	});
}

function postLogin(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return res.status(422).render('auth/login', {
			errorMessage: errors.array()[0].msg,
			oldInput: {
				email: email,
				password: password,
			},
			errors: errors.array()
		})
	}

	User.findOne({ email: email }).then((user) => {
		if (!user) {
			return res.status(422).render('auth/login', {
				errorMessage: 'Invalid email or password',
				oldInput: {
					email: email,
					password: password,
				},
				errors: []
			})
		}

		bcrypt.compare(password, user.password).then(doMatch => {
      if(doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
				if(user.role === "admin") {
					req.session.isAdmin = true;
				} else {
					req.session.isAdmin = false;
				}
        return req.session.save((err) => {
          console.log("error: ", err);
          res.redirect("/dashboard");
        })
      }
    })
	});
}

function postLogout(req, res, next) {
	req.session.destroy(err => {
		console.log(err);
		res.redirect('/login');
	})
}

function getSignUp(req, res, next) {
	if(req.session.isLoggedIn) {
		return res.redirect("/dashboard");
	}

	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('auth/signup', {
		errorMessage: message,
		oldInput: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		errors: [],
		activePage: 'signup'
	});
}

function postSignUp(req, res, next) {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;

	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return res.status(422).render('auth/signup', {
			errorMessage: errors.array()[0].msg,
			oldInput: {
				email: email,
				username: username,
				password: password,
				confirmPassword: req.body.comfirmPassword,
			},
			errors: errors.array()
		})
	}

	bcrypt
		.hash(password, 12)
		.then((hashedPassword) => {
			const user = new User({
				email: email,
				username: username,
				password: hashedPassword,
			});
			return user.save();
		})
		.then(() => {
			res.redirect('/login');
		})
		.catch((err) => {
			console.log(err);
		});
}

module.exports = {
	getLogin,
  postLogin,
	postLogout,
	getSignUp,
	postSignUp,
};
