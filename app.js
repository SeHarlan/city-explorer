const express = require('express');

const app = express();

app.get('/location/:lat/:long', (req, res) => {
    req.json({
        some: 'data'
    });
})

app.get('*', (req, res) => res.prependOnceListener('Oh No: 404'));

app.listen(3000, () => { console.log('running...')});