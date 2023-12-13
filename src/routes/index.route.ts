//import all route definitions to 1 file
import { Express, Request, Response } from "express";
import authRouter from "./auth.route";

import filmRouter from "./film.route";
import actorRouter from "./actor.route";

export const mainRoute = (app: Express) => {
    app.use("/auth", authRouter);
    app.use("/actors", actorRouter);
    app.use("/films", filmRouter);
    app.get('/', (req: Request, res: Response) => res.json('  Hello World!'));
}