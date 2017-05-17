var express = require('express');
var router = express.Router();
var request =require('request');
var City = require('../DAL/models/city.js'); 
var mongoose =require('mongoose');
var Schema =mongoose.Schema;

router.route('/data_entry').post(enterData);

var citySchema =new  Schema({
	//cityId : Schema.ObjectId,   
	city : String,
	state : String
});

function enterData(req, res, next) {
	var options = {};
	processAndStoreData(req.body.cities);
    res.send("Data Entered.");
}

function processAndStoreData(cities){
    var city = new City();
    for(var i in cities){
    cityOb = new city();
    cityOb.city = cities[i].City;
    cityOb.save();
    }    
}


module.exports = router;


