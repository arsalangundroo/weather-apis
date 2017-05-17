var weatherStore = require('../DAL/store/weatherStore.js');
var cityStore = require('../DAL/store/cityStore.js');
var openWeatherApi = require('../third-party-apis/openWeatherApi.js');

function getWeatherForCity(city, options) {
	var promise = new Promise(
		function (resolve, reject) {

			function successGet(weatherInfo) {
				if (weatherInfo == null) {
					getWeatherFromApi(city_name, promise);
				} else {
					resolve(weatherInfo);
				}
			}
			function errorGet(err) {
				getWeatherFromApi(city_name, promise);
			}

            function getWeatherFromApi(city_name, promise) {
				openWeatherApi.getWeatherForCity(city_name).then(
					function success(weatherInfo) {
						resolve(weatherInfo);
						//save the newly fetched city and its weather info
						cityStore.saveCity(city_name).then(
							function () {
								weatherStore.saveWeatherData(weatherData).then(
									function (data) {
										//TODO: log new data entry 
									},
									function error(err) {
										//TODO: log error.
									}
								);
							},
							function error() {
								//TODO: log error.
							});
					},
					function (err) {
						reject(err);
					}
				);

			}


			weatherStore.getWeatherForCity(city, options).then(successGet, errorGet);
		});
	return promise;
}


exports.getWeatherForCity = getWeatherForCity;


