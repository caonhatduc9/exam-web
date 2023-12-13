// import reflectMetadata from "reflect-metadata";
import express, { NextFunction, Request, Response } from "express"
import { myDataSource } from './db';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger-output.json';

import { setupCors } from "./utils/cors.util";
import { mainRoute } from "./routes/index.route";
import morgan from "morgan";
import { logger } from "./utils/logger.util";
import { defaultErrorHandler } from "./middleware/error.middleware";

dotenv.config();
const app = express();
const port: number = +process.env.PORT_SV || 5000;

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

app.use(express.json());
setupCors(app);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
mainRoute(app);
app.use(defaultErrorHandler);
app.listen(port, () => console.log('Server running on port: ', port));
//global error handler
/*
packages:
npm i npm install typescript --save-dev npm install @types/node --save-dev nodemon ts-node
npm install eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser ts-node tsc-alias tsconfig-paths rimraf nodemon --save-dev

*/