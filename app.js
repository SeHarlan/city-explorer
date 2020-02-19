const express = require('express');
const cors = require('cors');
const { getLocation, getWeather } = require('./api.js');

const app = express();

let lat;
let long;

app.use(cors());



app.get('/location', async(req, res, next) => {
    try {
        const data = await getLocation(req.query.location);
     
        lat = data.lat;
        long = data.long;
        res.json({
            formatted_query: data.location,
            latitude: data.lat,
            longitude: data.long
        });
    } catch (err) { 
        next(err);
    }
});

app.get('/weather', async(req, res, next) => {
    try {
        const data = await getWeather(lat, long);
    
        const weatherData = data.map(day => {
            return {
                forecast: day.summary,
                time: new Date(day.time * 1000)
            };
        });
    
        res.json({
            upComingWeather: weatherData
        });
    } catch (err) { 
        next(err);
    }
});

app.get('*', (req, res) => res.json({ OhNo: 404 }));


module.exports = {
    app: app
};

