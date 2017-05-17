var Weather = require('../models/weather.js');
var openWeatherApi = require('../../third-party-apis/openWeatherApi.js');

function getWeatherForCity(city_name, options) {
    var promise = new Promise(
        function (resolve, reject) {
            Weather.find({ city: city_name }, function (err, weatherInfo) {
                if (err) {
                    reject(err);
                } else {
                    if (weatherInfo == null || weatherInfo.length == 0) {
                        reject(err);
                    } else {
                        resolve(weatherInfo);
                    }
                }
            });
        });
    return promise;
}

function saveWeatherData(weatherData) {
    var promise = new Promise(
        function (resolve, reject) {
            var weatherOb = new Weather();
            weatherOb.city = weatherData.city.name;
            weatherOb.weatherInfo = weatherData.list;
            weatherOb.save(function (err, savedWeatherOb) {
                if (err) {
                    reject(err);
                }
                resolve(savedWeatherOb);
            });
        });
    return promise;
}

exports.getWeatherForCity = getWeatherForCity;
exports.saveWeatherData = saveWeatherData;
