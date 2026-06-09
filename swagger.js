const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();
const { env } = require('node:process');

const doc = {
    security: [{ bearerAuth: [] }],
    info: {
        title: 'Contractors',
        description: 'Manage contractors, projects, and specialties'
    },
    // host: 'localhost:8080',
    // schemes: ["http"]
    host: 'contractors-wd2g.onrender.com',
    schemes: ["https"]
};

const outputFile = './swagger.json';
const routes = [
    './server.js'
]

swaggerAutogen(outputFile, routes, doc);
