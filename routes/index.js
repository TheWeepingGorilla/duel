var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/')
}

router.get('/', function (req, res) {
		res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
		res.render('register', { });
});

router.post('/register', function(req, res) {
		Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
				if (err) {
					return res.render("register", {info: "Sorry. That username already exists. Try again."});
				}
				passport.authenticate('local')(req, res, function () {
						res.redirect('/');
				});
		});
});

router.get('/login', function(req, res) {
		res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
		res.redirect('/');
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// router.get('/duel', ensureAuthenticated, function(req, res) {
// 	res.render('duel', { user : req.user });
// });

// auth removed for development so login isn't required after every file change
router.get('/duel', function(req, res) {
	res.render('duel', { user : req.user });
});

router.get('/ping', ensureAuthenticated, function(req, res) {
		res.status(200).send("pong!");
});

module.exports = router;