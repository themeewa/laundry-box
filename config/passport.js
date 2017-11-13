var passport = require('passport');
var User  = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user,done) {
	done(null,user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id,function(err,user) {
		done(err, user);
	});
});

passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function (req,email,password,done) {
	// console.log('localsignup from config called')
	req.checkBody('email','invalid email').notEmpty().isEmail();
	req.checkBody('password','invalid password').notEmpty().isLength({ min: 6 });
	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(error) {
			messages.push(error.msg);
		});
		return done(null,false,req.flash('error',messages))
	}

	User.findOne({'email':email}, function(err, user){
		console.log('user.findone called');
		if (err) {
			console.log('error from findone: '+err);
			return done(err);
		}
		if (user) {
			console.log('user from findone: '+user)
			return done(null,false, {message:"email is already in use"});
		}
		var newUser = new User();
		newUser.email = email;
		newUser.password = newUser.encryptPassword(password);
		newUser.save(function(err,result) {
			console.log('newuser from config called,creating new user')
			if (err) {
				return done(err);
			}
			return done(null, newUser);
		});
	});
}));

passport.use('local.signin', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password,done) {
	req.checkBody('email','invalid email').notEmpty().isEmail();
	req.checkBody('password','invalid password').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(error) {
			messages.push(error.msg);
		});
		return done(null,false,req.flash('error',messages))
	}

	User.findOne({'email':email}, function(err, user){
		console.log('user.findone called');
		if (err) {
			console.log('error from findone: '+err);
			return done(err);
		}
		if (!user) {
			console.log('user from findone: '+user)
			return done(null,false, {message:"email does not exists"});
		}
		if (!user.validPassword(password)) {
			return done(null,false, {message:"Bad Password"});
		}
		return done(null, user);
	});
}));