var City = require('../models/city.js');

function getAllCityNames() {
	var promise = new Promise(
		function(resolve, reject) {
			 City.find(function(err, cities) {
             if(err) {
                 reject(err);
             } else {
                 resolve(cities);
             }
        });
    });	
	return promise;
}

function saveCity(city_name) {
    var promise = new Promise(
        function (resolve, reject) {
            var cityOb = new City();
            cityOb.city=city_name;          
            cityOb.save(function (err, savedCityOb) {
                if (err) {
                    reject(err);
                }
                resolve(savedCityOb);
            });
        });
    return promise;
}
       
exports.getAllCityNames=getAllCityNames;
exports.saveCity=saveCity;