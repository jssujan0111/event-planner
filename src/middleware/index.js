const express = require('express');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./swagger.yaml');
const applyMiddleware = (app) =>{
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}))
    // app.use(OpenApiValidator.middleware({
    //     apiSpec: './swagger.yaml',
    //     validateRequests: true,
    //     validateResponses: false
    // }))
   
    app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc));
};

module.exports = applyMiddleware;