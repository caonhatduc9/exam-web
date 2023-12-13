import { Request, Response } from "express";
import { myDataSource } from "../db";
import { Actor } from "../entity/actor.entity";

class ActorService {

    async getActor() {
        const actors = await myDataSource.getRepository(Actor).find()
        return actors;
    }
    async getActorById(actorId: number) {
        return await myDataSource.getRepository(Actor).findOneBy({
            actorId: actorId,
        })
    }
    async createActor(actor: any) {
        const newActor = myDataSource.getRepository(Actor).create(actor)
        const results = await myDataSource.getRepository(Actor).save(newActor)
        return results;
    }

    async updateActor(updateActor: any, actorId: number) {
        const actor = await myDataSource.getRepository(Actor).findOneBy({
            actorId: actorId,
        })
        // if (!actor) return res.status(404).json({ message: "actor not found" });
        myDataSource.getRepository(Actor).merge(actor, updateActor)
        const results = await myDataSource.getRepository(Actor).save(actor)
        return results;
    }

    async deleteActorbyId (actorId: number) {
        const results = await myDataSource.getRepository(Actor).delete(actorId)
        return results;
    }

}
export default new ActorService();
