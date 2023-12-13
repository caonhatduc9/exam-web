import { Router } from "express";
import filmController from "../controllers/film.controller";
const filmRouter = Router();


filmRouter.get("/", filmController.getFilm);
filmRouter.get("/:filmId", filmController.getFilmById);
filmRouter.post("/", filmController.createFilm);
filmRouter.patch("/:filmId", filmController.updateFilm);
filmRouter.delete("/:filmId", filmController.deleteFilmById);

export default filmRouter;