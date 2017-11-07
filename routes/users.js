var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');


var csrfProtection = csrf();
router.use(csrfProtection);

/* GET users listing. */

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('user/profile');
});

router.get('/', notLoggedIn, function(req, res, next) {
  res.redirect('/inventory/entry');
});

router.get('/signup',notLoggedIn, function(req, res, next) {
	// console.log(req.flash('error'));
	var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
router.post('/signup', passport.authenticate('local.signup', {
	successRedirect: '/inventory/entry',
	failureRedirect: '/users/signup',
	failureFlash: true
}));

router.get('/login',notLoggedIn, function(req, res, next) {
	var messages = req.flash('error');
  res.render('user/login', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
router.post('/login',passport.authenticate('local.signin', {
	successRedirect: '/inventory/entry',
	failureRedirect: '/users/login',
	failureFlash: true
}));

router.get('/logout',isLoggedIn, function(req,res,next) {
	req.logout();
	res.redirect('/');
});

module.exports = router;

function isLoggedIn(req,res,next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

function notLoggedIn(req,res,next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/inventory/entry');
}