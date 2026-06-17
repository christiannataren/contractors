const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();
const { env } = require('node:process');

const doc = {
    security: [{ bearerAuth: [] }],
    info: {
        title: 'Contractors',
        description: 'Manage projects and find contractors to execute them'
    },
    securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Enter: Bearer <your_token>"
        }
    },
    security: [{ bearerAuth: [] }],
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
