const express = require('express');
const students = require('./students.json');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world from express');
});

app.get('/api', (req, res) => {
    res.send({
        data: students 
    });
});

app.get('/feed', (_, res) => {
    res.send('this is your feed!!!');
});

app.get('/username', (_, res) => {
    res.send('atlas');
});

app.get('/api/:username', (req, res) => {
    console.log(req.params);
    res.json({});
})

app.use('*', (_, res) => {
    res.status(404).json({
        error: 'Page not found.'
    });
});

app.listen(4000, (err) => {
    if(err) {
        console.error('Something went wrong', err);
        return;
    }
    console.log('Server running on port 4000');
});
