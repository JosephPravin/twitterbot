const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const twitterRoute = require('./api/routes/twitterRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.send(200).json({});
    }
    next();
});

// Routes which should handle request
app.use('/tweet', twitterRoute);

// middleware to handle unavailablee routes
app.use((req, res, next) => {
    const error = new Error("Path not found");
    error.status = 404;
    next(error);
});
  
// middleware to handle error
app.use((error, req, res, next) => {
    console.log("Error handler");
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(3000, ()=> console.log('App listening'));