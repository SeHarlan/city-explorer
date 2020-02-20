const express = require('express');
const cors = require('cors');
const { getLocation, getWeather, getTrails, getEvents, getYelp } = require('./api.js');

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

app.get('/trails', async(req, res, next) => {
    try {
        const data = await getTrails(lat, long);

        
        const trailData = data.map(trail => {
            const conDate = trail.conditionDate.split(' ');
            return {
                name: trail.name,
                location: trail.location,
                length: trail.length,
                stars: trail.stars,
                star_votes: trail.starVotes,
                summary: trail.summary,
                trail_url: trail.url,
                conditions: trail.conditionStatus,
                condition_date: conDate[0],
                condition_time: conDate[1]
            };
        });
        res.json(trailData);
    } catch (err) {
        next(err);
    }
});


app.get('/events', async(req, res, next) => {
    try {
        const data = await getEvents(lat, long);
        
        const eventData = data.events.event.map(day => {
            return {
                link: day.url,
                name: day.title,
                event_date: day.start_time,
                summary: day.description
            };
        });
        res.json(eventData);
    } catch (err) {
        next(err);
    }
});

app.get('/yelp', async(req, res, next) => {
    try {
        const data = await getYelp(lat, long);
        
        const eventData = data.map(rest => {
            return {
                name: rest.name,
                image_url: rest.image_url,
                price: rest.price,
                rating: rest.rating,
                url: rest.url
            };
        });
        res.json(eventData);
    } catch (err) {
        next(err);
    }
});

app.get('*', (req, res) => res.json({ OhNo: 404 }));


module.exports = {
    app: app
};

