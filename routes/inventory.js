var express = require('express');
var router = express.Router();
var Order = require('../models/order');

/* GET users listing. */
router.get('/',isLoggedIn, function(req,res,next) {
	console.log('login on inventory called')
	res.redirect('/inventory/entry');
});

// router.get('/manage',isLoggedIn, function(req, res, next) {
// 	console.log('inventory manage page served');
// 	Order.find(function(err,docs) {
// 		console.log(docs)
// 		res.render('inventory/manage',{orders:docs});
// 	});
// });

router.get('/entry',isLoggedIn, function(req,res,next) {
	console.log('login on inventory called')
	res.render('inventory/entry');
});

router.get('/search',isLoggedIn, function(req,res,next) {
	console.log('login on inventory called')
	res.render('inventory/search');
});

router.get('/advance',isLoggedIn, function(req,res,next) {
	console.log('login on inventory called')
	res.render('inventory/advance');
});

router.get('/billing', isLoggedIn, function(req, res, next) {
  res.render('inventory/billing');
});

module.exports = router;

function isLoggedIn(req,res,next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/users/login');
}

// function notLoggedIn(req,res,next) {
// 	if (!req.isAuthenticated()) {
// 		return next();
// 	}
// 	res.redirect('/users/login');
// }