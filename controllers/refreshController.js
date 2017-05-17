var weatherStore = require('../DAL/store/weatherStore.js');
var cityStore = require('../DAL/store/cityStore.js');
var openWeatherApi = require('../third-party-apis/openWeatherApi.js');
var when = require('when');
function refreshWeatherData() {
    var city_names = [];
    var promise = new Promise(
        function (resolve, reject) {
            function successGet(cities) {
                for (var i in cities) {
                    city_names.append(cities[i].city)
                }
                updateWeather(city_names, promise);
            }
            function errorGet(err) {
                reject(err);
            }
            cityStore.getAllCityNames().then(successGet, errorGet);
        });
    return promise;
}

function updateWeather(city_names, promise) {
    function successGet(completedPromiseArray) {
        //insert data into db.
        resolve(completedPromiseArray.length);

    }
    function errorGet(err) {
        reject(err);
    }
    var promise_array = [];
    for (city_name in city_names) {
        //  openWeatherApi.getWeatherForCity(city_name).then(successGet,errorGet);
        promise_array.push(downloadAndStoreWeatherData(city_name));
    }
    when.all(promise_array).then(successGet,errorGet);
}

function downloadAndStoreWeatherData(city_name) {
    var promise = new Promise(
        function (resolve, reject) {
            function successGet(weatherData) {
                weatherStore.saveWeatherData(weatherData).then(
                    function (data) {
                        resolve(data);
                    },
                    function error(err) {
                        reject(err);
                    }
                );

            }
            function errorGet(err) {

            }
            openWeatherApi.getWeatherForCity(city_name).then(successGet, errorGet);
        });
    return promise;
}

exports.refreshWeatherData = refreshWeatherData;