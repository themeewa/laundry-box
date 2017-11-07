var express = require('express');
var router = express.Router();



router.get('/getbill', function(req, res, next) {

	User.findOne({'email':email}, function(err, user){
		console.log('counter search called');
		if (err) {
			console.log('error from findone: '+err);
			return done(err);
		}
		if (!user) {
			console.log('user from findone: '+user)
			return done(null,false, {message:"email does exists"});
		}
		if (!user.validPassword(password)) {
			return done(null,false, {message:"Bad Password"});
		}
		return done(null, user);
	});

});

module.exports = router;