// import swaggerJsdoc from "swagger-jsdoc";

// import swaggerUi from 'swagger-ui-express';
// import Yaml from 'yaml';
// import fs from 'fs';
// import path from 'path';
// import { Express } from "express";


// const yamlFile = fs.readFileSync(path.resolve('swagger.yaml'), 'utf8');
// const swaggerDocument = Yaml.parse(yamlFile);


// import swaggerAutogen from 'swagger-autogen';

// const doc = {
//     info: {
//         title: "Sakila Express API with Swagger",
//         version: "0.1.0",
//         description:
//             "This is a simple CRUD API application made with Express and documented with Swagger",
//         license: {
//             name: "MIT",
//             url: "https://spdx.org/licenses/MIT.html",
//         },
//         contact: {
//             name: "group07",
//             url: "https://group07.com",
//             email: "info@email.com",
//         },
//     },
//     servers: [
//         {
//             url: 'http://localhost:3000',              // by default: 'http://localhost:3000'
//             description: ''
//         },
//         // { ... }
//     ],                // by default: 'localhost:3000'
//     // basePath: '',             // by default: '/'
//     // schemes: [],              // by default: ['http']
//     // consumes: [],             // by default: ['application/json']
//     // produces: [],             // by default: ['application/json']
//     tags: [                   // by default: empty Array
//         {
//             name: 'actor',             // Tag name
//             description: 'about actor route'       // Tag description
//         },
//         {
//             name: 'film',             // Tag name
//             description: 'about film route'       // Tag description
//         }
//         // { ... }
//     ],
//     components: {
//         schemas: {
//             Actor: {


//                 type: 'object',
//                 require: ['actorId', 'firstName', 'lastName', 'lastUpdate'],
//                 properties: {
//                     actorId: {
//                         type: 'integer',
//                         example: 1
//                     },
//                     firstName: {
//                         type: 'string',
//                         example: "John"
//                     },
//                     lastName: {
//                         type: 'string',
//                         example: "Doe"
//                     },
//                     lastUpdate: {
//                         type: 'string',
//                         format: 'date-time',
//                         example: "2023-02-15T04:34:33.727"
//                     }
//                 }
//             }
//         }
//     },
//     apis: ["./src/index.ts", "./src/entity/*.entity.ts", "./src/routes/*.route.ts"]    // by default: empty object
// };

// const outputFile = './swagger-output.yaml';
// const routes = ["./src/index.ts", "./src/entity/*.entity.ts", "./src/routes/*.route.ts"];

// /* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
// root file where the route starts, such as index.js, app.js, routes.js, etc ... */

// swaggerAutogen()(outputFile, routes, doc).then(async () => {
//     await import('../index.ts'); // Your project's root file
// }
// )

// // const doc = {...} // update doc
// // const outputFile = './swagger-output.json';
// // const endpointsFiles = [path.join(__dirname, 'routes/routes.js')];
// // swaggerAutogen()(outputFile, endpointsFiles, doc);

// // const optionSwagger = {
// //     definition: {
// //         openapi: "3.1.0",
// //         info: {
// //             title: "Sakila Express API with Swagger",
// //             version: "0.1.0",
// //             description:
// //                 "This is a simple CRUD API application made with Express and documented with Swagger",
// //             license: {
// //                 name: "MIT",
// //                 url: "https://spdx.org/licenses/MIT.html",
// //             },
// //             contact: {
// //                 name: "group07",
// //                 url: "https://group07.com",
// //                 email: "info@email.com",
// //             },
// //         },
// //         servers: [
// //             {
// //                 url: "http://localhost:3000",
// //             },
// //         ],
// //     },
// //     apis: ["./src/index.ts", "./src/entity/*.entity.ts", "./src/routes/*.route.ts"],
// // };

// // const specs = swaggerJsdoc(optionSwagger);

// // export const setupSwagger = (app: Express) => {
// //     app.use(
// //         "/swagger",
// //         swaggerUi.serve,
// //         swaggerUi.setup(specs, { explorer: true })
// //     );
// // }