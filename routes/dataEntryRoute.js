var express = require('express');
var router = express.Router();
var request =require('request');
var mongoose =require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema =mongoose.Schema;

router.route('/data_entry').post(enterData);

var citySchema =new  Schema({
	//cityId : Schema.ObjectId,   
	city : String,
	state : String
});
citySchema.plugin(mongoosePaginate);

function enterData(req, res, next) {
	var options = {};
	processAndStoreData(req.body.cities);
    res.send("Data Entered.");
}

function processAndStoreData(cities){
    var city = mongoose.model('City',citySchema);
    for(var i in cities){
    cityOb = new city();
    cityOb.city = cities[i].City;
    cityOb.state = cities[i].State;
    cityOb.save();
    }    
}


module.exports = router;


