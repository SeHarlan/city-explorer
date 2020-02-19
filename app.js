const express = require('express');
const cors = require('cors')
const { getLocation, getWeather } = require('./api.js');

const app = express();


app.use(cors());
app.get('/weather', (req, res) => {
    
    const data = getWeather();

    const weatherData = data.map(day => {
        return {
            forecast: day.summary,
            time: new Date(day.time)
        };
    });

    res.json({
        upComingWeather: weatherData
    });
});

app.get('/location', (req, res) => {
    
    const data = getLocation(req.query);
    
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

