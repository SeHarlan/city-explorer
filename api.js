const geoData = require('./geo.json');

function getLocation(city) {

    const data = geoData.results[0].geometry.location;

    const locationData = {
        location: city,
        lat: data.lat,
        long: data.lng
    };

    return locationData;
}

module.exports = {
    getLocation : getLocation,
};