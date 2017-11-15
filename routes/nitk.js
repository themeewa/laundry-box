var express = require('express');
var router = express.Router();

router.get('/awt',isLoggedIn, function(req,res,next) {
  console.log('awt assignment directory')
  res.render('nitk/awt');
});