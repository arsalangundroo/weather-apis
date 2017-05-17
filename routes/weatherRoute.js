var express = require('express');
var when = require('when');
var controller = require('../controllers/weatherController.js');
var router = express.Router();

router.route('/:city/get').get(getWeatherForCity);

function getWeatherForCity(req, res, next){
     var options = {};
	when(controller.getWeatherForCity(req.params.city, options),
		function success(weatherInfo) {
			res.send(weatherInfo);
		},
		function error(err) {
			res.send(err);
		});
}

module.exports=router;
