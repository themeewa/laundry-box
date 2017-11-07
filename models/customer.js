var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var custSchema = new Schema({
	custPhone:{type:Number,required:true},
	custName:{type:String, required:true},
	custType:{type:String},
	custRevenue:{type:Number}
});

module.exports = mongoose.model('Customer',custSchema);

// 

