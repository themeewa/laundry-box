var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var billSchema = new Schema({
		orderNo: {type:Number, required:true},
		billNo: {type:Number, required:true},
		custName: {type:String, required:true},
		custPhone: {type:Number, required:true},
		orderDate: {type:Date, required:true},
		billingDate: {type:Date, required:true},
		items:[{
			itemName: {type:String, required:true},
			qty: {type:Number, required:true},
			rate: {type:Number, required:true}
		}],
		amount: {type:Number, required:true},
		discount: {type:Number, required:true},
		cgst: {type:Number, required:true},
		sgst: {type:Number, required:true},
		netAmount: {type:Number, required:true},
	});

module.exports = mongoose.model('Bill',billSchema)