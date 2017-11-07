var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
	orderNo: {type:Number, required:true},
	ocount: {type:Number,required:true},
	ostatus: {type:String, required:true,default:'factory'},
	articles:[{
		aid:{type:Number, required:true},
		acolour:{type:String, required:true},
		atype:{type:String, required:true},
		astatus:{type:String, required:true},
		adatein:{type: Date, default: Date.now},
		adateout:{type: Date},
		arate:{type:Number, required:true},
		agender:{type:String, required:true},
	}],
	odatein:{type: Date, default: Date.now},
	odateout:{type: Date},
	custname:{type:String, required:true},
	custphone:{type:Number, required:true},
	oprice:{type:Number, required:true},
	odiscount:{type:Number, required:true},
	onetamount:{type:Number, required:true},
	opaid:{type:Boolean}
});



module.exports = mongoose.model('Order',orderSchema)

// 
// var User  = require('../models/user');

// calcAmount = function (order) {
// 	console.log('calcAmount accessed for order');
// 	Order.findOne({'orderNo':order.orderNo}, function(err, order){
// 		console.log('order.findone called');
// 		if (err) {
// 			console.log('error from findone: '+err);
// 			return err;
// 		}
// 		if (!order) {
// 			console.log('order from findone: '+order)
// 			return false;
// 		}

// 		amount = 0;

// 		for (var i = order.articles.length - 1; i >= 0; i--) {
// 			amount = amount + (order.articles[i].rate - ((order.articles[i].rate*order.articles[i].adiscount)/100))
// 		}

// 		return amount;
// 	});
// };


// 
// function saveOrder(order) {
// 		var newOrder = new Order();
// 		newOrder.orderNo = order.orderNo;
// 		// newOrder.ocount = order.ocount;
// 		newOrder.ostatus = order.ostatus;
// 		newOrder.articles = order.articles;
// 		// newOrder.odatein = order.odatein;
// 		newOrder.odateout = order.odateout;
// 		newOrder.custno = order.custno;
// 		newOrder.custphone = order.custphone;
// 		newOrder.oprice = order.oprice;
// 		newOrder.odiscount = order.odiscount;
// 		newOrder.onetamount = order.onetamount;
// 		newOrder.opaid = order.opaid;

// 		newOrder.ocount = order.articles.length;

// 		newOrder.save(function(err,result) {
// 			console.log('newuser from config called,creating new user')
// 			if (err) {
// 				return done(err);
// 			}
// 			return done(null, newOrder);
// 		});
// };
