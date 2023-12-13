// import swaggerJsdoc from "swagger-jsdoc";

// import swaggerUi from 'swagger-ui-express';
// import Yaml from 'yaml';
// import fs from 'fs';
// import path from 'path';
// import { Express } from "express";


// const yamlFile = fs.readFileSync(path.resolve('swagger.yaml'), 'utf8');
// const swaggerDocument = Yaml.parse(yamlFile);


import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: "Sakila Express API with Swagger",
        version: "3.0.0",
        description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
            name: "group07",
            url: "https://group07.com",
            email: "info@email.com",
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',              // by default: 'http://localhost:3000'
            description: 'localhost'
        },
    ],                // by default: 'localhost:3000'
    tags: [                   // by default: empty Array
        {
            name: 'actor',             // Tag name
            description: 'about actor route'       // Tag description
        },
        {
            name: 'film',             // Tag name
            description: 'about film route'       // Tag description
        }
        // { ... }
    ],
    components: {
        schemas: {
            Actor: {
                actorId: 1,
                firstName: "John",
                lastName: "Doe",
                lastUpdate: "2023-02-15T04:34:33.727"
                // actorId: 
                //     type: 'integer',
                //     example: 1
        
                // firstName: {
                //     type: 'string',
                //     example: "John"
                // },
                // lastName: {
                //     type: 'string',
                //     example: "Doe"
                // },
                // lastUpdate: {
                //     type: 'string',
                //     format: 'date-time',
                //     example: "2023-02-15T04:34:33.727"
                // }
            }
        }
    }
};

const outputFile = './swagger-output.json';
const routes = ["./src/routes/index.route.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
