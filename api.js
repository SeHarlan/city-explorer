const geoData = require('./geo.json');
const weatherData = require('./darksky.json');

function getLocation(query) {

    const data = geoData.results[0];

    const locationData = {
        location: data.formatted_address,
        lat: data.geometry.location.lat,
        long: data.geometry.location.lng
    };

    return locationData;
}

function getWeather(lat, long) {

    return weatherData.daily.data;

}

module.exports = {
    getLocation: getLocation,
    getWeather: getWeather
};