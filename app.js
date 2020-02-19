const express = require('express');
const cors = require('cors')
const { getLocation, getWeather } = require('./api.js');

const app = express();

let lat;
let long;

app.use(cors());
app.get('/weather', (req, res) => {
    
    const data = getWeather(lat, long);

    const weatherData = data.map(day => {
        return {
            forecast: day.summary,
            time: new Date(day.time * 1000)
        };
    });

    res.json({
        upComingWeather: weatherData
    });
});

app.get('/location', (req, res) => {
    
    const data = getLocation(req.query);
    lat = data.lat;
    long = data.long;
    res.json({
        formatted_query: data.location,
        latitude: data.lat,
        longitude: data.long
    });
});

app.get('*', (req, res) => res.json({ OhNo: 404 }));




module.exports = {
    app: app
};

