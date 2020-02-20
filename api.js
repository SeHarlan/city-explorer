require('dotenv').config();
// const geoData = require('./geo.json');
// const weatherData = require('./darksky.json');

const request = require('superagent');

async function getLocation(query) {

    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${query}&format=json`;

    const urlData = await request.get(URL);
    const dataBody = urlData.body[0];
    
    const locationData = {
        location: dataBody.display_name,
        lat: dataBody.lat,
        long: dataBody.lon
    };

    return locationData;
}

async function getWeather(lat, long) {

    const URL = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${long}`;

    const weatherData = await request.get(URL);

    return weatherData.body.daily.data;

}

async function getTrails(lat, long) {

    const URL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=10&key=${process.env.HIKING_PROJECT_API_KEY}`;

    const data = await request(URL);
    return data.body.trails;
}

async function getYelp() {

    const URL = 'api.yelp.com';
    const data = (await request.get(URL)).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`);

    return data;
}

module.exports = {
    getLocation: getLocation,
    getWeather: getWeather,
    getYelp: getYelp,
    getTrails: getTrails
};