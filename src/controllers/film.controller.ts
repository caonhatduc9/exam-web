import filmService from "../services/film.service";
import { Request, Response } from "express";

class FilmController {
    getFilm = async (req: Request, res: Response) => {
        //#swagger.tags = ['film']
        const films = await filmService.getFilm()
        return res.status(200).json(films);
    }

    getFilmById = async (req: Request, res: Response) => {
        //#swagger.tags = ['film']
        const filmId = Number(req.params.filmId)
        const film = await filmService.getFilmById(filmId)
        if (!film) {
            return res.status(404).json({ message: "film not found" })
        }
        return res.status(200).json(film)
    }

    createFilm = async (req: Request, res: Response) => {
        //#swagger.tags = ['film']
        const { filmId, firstName, lastName } = req.body;
        console.log(filmId, firstName, lastName);
        const newFilm = await filmService.createFilm({ filmId, firstName, lastName })
        return res.status(201).json(newFilm);
    }

    updateFilm = async (req: Request, res: Response) => {
        //#swagger.tags = ['film']
        const filmId = Number(req.params.filmId)
        const { firstName, lastName } = req.body;
        const updateFilm = await filmService.updateFilm({ firstName, lastName }, filmId)
        return res.status(200).json(updateFilm);
    }

    deleteFilmById = async (req: Request, res: Response) => {
        //#swagger.tags = ['film']
        const filmId = Number(req.params.filmId)
        const results = await filmService.deleteFilmbyId(filmId)
        if (results.affected === 0) {
            return res.status(404).json({ message: "film not found" });
        }
        return res.json({ message: "film deleted" })
    }
}
export default new FilmController();