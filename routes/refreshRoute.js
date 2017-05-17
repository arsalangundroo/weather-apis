var express = require('express');
var when = require('when');
var controller = require('../controllers/refreshController.js');
var router = express.Router();

router.route('/').get(refreshWeatherData);

function refreshWeatherData(req, res, next){
	 when(controller.refreshWeatherData(),
		function success(status) {
			res.send(status);
		},
		function error(err) {
			res.send(err);
		});
}

module.exports=router;