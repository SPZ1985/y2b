var mongoose = require('mongoose');

//book.schema
var y2bSchema = mongoose.Schema({
	user:{
		type: String,
		required: true
	},
	url:{
		type: String,
		required: true
	},
	down_link:{
		type: String,
		required: true
	},
	status:{
	type: String
	},
	time_initiated:{
	type: Date,
	default: Date.now
	},
	time_updated:{
		type: Date,
		default: Date.now
	},
	retry_count:{
		type: Number,
		default: 0
	}	
});

var Y2B = module.exports = mongoose.model('Y2B', y2bSchema);

//get data
module.exports.getY2b = function(callback, limit){
	Y2B.find(callback).limit(limit);
}

//get single record by id
module.exports.getY2bById = function(id, callback){
	Y2B.findById(id, callback);
}
//add a record
module.exports.addY2b = function(y2b, callback){
	Y2B.create(y2b, callback);
}
//update a record by id
module.exports.updateY2b = function(id, y2b, options, callback){
	var query = {_id: id};
	var update = {
					user: y2b.user,
					url: y2b.url,
					down_link: y2b.down_link,
					status: y2b.status,
					time_initiated: y2b.time_initiated,
					time_updated: y2b.time_updated,
					retry_count: y2b.retry_count					
				}
	Y2B.findOneAndUpdate(query, update, options, callback);
}
//delete/remove a record
module.exports.removeY2b = function(id, callback){
	var query = {_id: id};
	Y2B.remove(query, callback);
}	