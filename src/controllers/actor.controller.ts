import actorService from "../services/actor.service";
import { Request, Response } from "express";

class ActorController {
    getActor = async (req: Request, res: Response) => {
        //#swagger.tags = ['actor']
        try {
            const actors = await actorService.getActor()
            //#swagger.responses[200] = { description: 'actor list.' }
            return res.status(200).json(actors);
        }
        catch (err) {
            //#swagger.responses[500] = { description: 'Internal server error.' }
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    getActorById = async (req: Request, res: Response) => {
        //#swagger.tags = ['actor']
        /* #swagger.parameters['actorId'] = {
            in: 'path',
            description: 'actor ID.',
            required: true,
            type: 'integer'
        }*/
        const actorId = Number(req.params.actorId)
        try {
            const actor = await actorService.getActorById(actorId)
            if (!actor) {
                // #swagger.responseError[404] = { description: 'actor not found.' }
                return res.status(404).json({ message: "actor not found" })
            }
            // #swagger.response[200] = { description: 'actor.' }
            return res.status(200).json(actor)
        } catch (error) {
            // #swagger.responseError[500] = { description: 'Internal server error.' }
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    createActor = async (req: Request, res: Response) => {
        // #swagger.tags = ['actor']
        /*
                #swagger.requestBody = {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Actor"
                            }  
                        }
                    }
                   }  */
        const { actorId, firstName, lastName } = req.body;
        console.log(actorId, firstName, lastName);
        const newActor = await actorService.createActor({ actorId, firstName, lastName })
        return res.status(201).json(newActor);
    }

    updateActor = async (req: Request, res: Response) => {
        //#swagger.tags = ['actor']
        /*
        #swagger.parameters['actorId'] = {
            in: 'path',
            description: 'actor ID.',
            required: true,
            type: 'integer'
        }
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Actor"
                    }  
                }
            }
        }
        */
        const actorId = Number(req.params.actorId)
        console.log("🚀 ~ file: actor.controller.ts:69 ~ ActorController ~ updateActor= ~ actorId:", req.params)
        const { firstName, lastName } = req.body;
        const updateActor = await actorService.updateActor({ firstName, lastName }, actorId)
        return res.status(200).json(updateActor);
    }

    deleteActorById = async (req: Request, res: Response) => {
        //#swagger.tags = ['actor']
        /*
        #swagger.parameters['actorId'] = {
            in: 'path',
            description: 'actor ID.',
            required: true,
            type: 'integer'
        }
        */
        const actorId = Number(req.params.actorId)
        const results = await actorService.deleteActorbyId(actorId)
        console.log("🚀 ~ file: actor.controller.ts:36 ~ ActorController ~ deleteActorById ~ results:", results)
        if (results.affected === 0) {
            //#swagger.responseError[404] = { description: 'actor not found.' }
            return res.status(404).json({ message: "actor not found" });
        }
        //@swagger.response[200] = { description: 'actor deleted.' }
        return res.json({ message: "actor deleted" })
    }
}
export default new ActorController();