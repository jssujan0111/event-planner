require('dotenv').config()
const express = require('express');
const applyMiddleware = require('./middleware');
const routes = require('./routes');
const { notFound } = require('./middleware/notFound');
// main express app and middleware
const app = express();
applyMiddleware(app);
app.use(routes)
// not found middleware
app.use(notFound)
app.use('/ok',(_req,res,_next)=>{
    res.status(200).json({message: "server is okay"})
})

app.use((err,_req,res,_next)=>{
    console.error(err);
    //mongoDB CastError
    if(err.name === 'CastError'){
        // err.message = `Resource not found. invalid:${err.path}:${err.value}`;
        err.status = 404;
        err.error = 'Not Found'
        err.response = {
            code: err.status,
            error: err.error,
            data: {
                message: `Resource not found. invalid:${err.path}:${err.value}`
            }
        }
    };
    const internalServerError = {
        code: 500,
        error: 'Internal server error',
        data: {
            message: 'Internal server error,try again later'
        }
    }
    // if(err.name === 'JsonwebTokenError'){
    //     err.status = 400;
    //     err.error = 'Bad Request';
    //     err.response = {
    //         message: 'invalid access token, try again'
    //     }
    // }
    res.status(err.status || 500).json(err.response || internalServerError)
})

module.exports = app;