import { Request, Response } from "express";
import { myDataSource } from "../db";
import { Film } from "../entity/film.entity";

class FilmService {

    async getFilm() {
        const films = await myDataSource.getRepository(Film).find()
        return films;
    }
    async getFilmById(filmId: number) {
        return await myDataSource.getRepository(Film).findOneBy({
            filmId: filmId,
        })
    }
    async createFilm(film: any) {
        const newFilm = myDataSource.getRepository(Film).create(film)
        const results = await myDataSource.getRepository(Film).save(newFilm)
        return results;
    }

    async updateFilm(updateFilm: any, filmId: number) {
        const film = await myDataSource.getRepository(Film).findOneBy({
            filmId: filmId,
        })
        // if (!film) return res.status(404).json({ message: "film not found" });
        myDataSource.getRepository(Film).merge(film, updateFilm)
        const results = await myDataSource.getRepository(Film).save(film)
        return results;
    }

    async deleteFilmbyId(filmId: number) {
        const results = await myDataSource.getRepository(Film).delete(filmId)
        return results;
    }

}
export default new FilmService();
