var Order = require('../models/order');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/inventory');

var orders = [
	new Order({
		orderNo:123656,
		count:8
	}),
	new Order({
		orderNo:125456,
		count:15
	}),
	new Order({
		orderNo:153456,
		count:10
	}),
	new Order({
		orderNo:123486,
		count:2
	})
];


var done = 0;
for (var i = 0; i<orders.length;i++) {
	orders[i].save(function (err,result) {
		done++;
		if (done===orders.length) {
			exit();
		}
	});
}
function exit() {
	mongoose.disconnect();
}
