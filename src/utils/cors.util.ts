import cors from 'cors';
import { Express } from 'express';
const optionCors = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
export const setupCors = (app: Express) => {
    app.use(cors(optionCors));
}