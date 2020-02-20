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

async function getEvents(lat, long) {
   
    const URL = `http://api.eventful.com/json/events/search?app_key=${process.env.EVENTFUL_API_KEY}&where=${lat},${long}&within=25`;
    
    const data = await request(URL);
    console.log('_____long', long);
    console.log('data_________', data.text);

    
    return JSON.parse(data.text);
}

async function getYelp(lat, long) {
    console.log('-----------lat', lat);

    const URL = `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${long}`;

    const data = await request.get(URL).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`);

    return data.body.businesses;
}

module.exports = {
    getLocation: getLocation,
    getWeather: getWeather,
    getYelp: getYelp,
    getTrails: getTrails,
    getEvents: getEvents
};