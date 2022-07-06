const bcrypt = require('bcryptjs');
const User = require('../../models/user/user.model');

function getLogin(req, res, next) {
	res.render('auth/login');
}

function postLogin(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email: email }).then((user) => {
		if (!user) {
			return res.status(422).render('auth/login');
			//TODO add validation.
		}

		bcrypt.compare(password, user.password).then(doMatch => {
      if(doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          console.log(err);
          res.redirect("/dashboard");
        })
      }
    })
	});
}

function postLogout(req, res, next) {
	req.session.destroy(err => {
		console.log(err);
		res.redirect('/');
	})
}

function getSignUp(req, res, next) {
	res.render('auth/signup');
}

function postSignUp(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	bcrypt
		.hash(password, 12)
		.then((hashedPassword) => {
			const user = new User({
				email: email,
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
