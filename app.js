const express = require('express');
const { getLocation } = require('./api.js');

const app = express();



app.get('/weather/:search', (req, res) => {
    res.json({
        hello: req.params.search
    });
});

app.get('/location/:query', (req, res) => {
    
    const data = getLocation(req.params.query);
    
    res.json({
        formatted_query: data.location,
        latitude: data.lat,
        longitude: data.long
    });
});

app.get('*', (req, res) => res.prependOnceListener('Oh No: 404'));




module.exports = {
    app: app
};

const port = process.env.PORT || 3000;

app.listen(port, () => { 
    console.log(`running on ${port}`);
});