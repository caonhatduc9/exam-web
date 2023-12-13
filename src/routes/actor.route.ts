import { Router } from "express";
import actorController from "../controllers/actor.controller";
import { createActorValidator } from "../middleware/actor.middleware";
import { validate } from "../validator";
import { accessTokenValidator } from "../middleware/auth.middleware";
const actorRouter = Router();


// /**
// * @swagger
// * /actors:
// *    get:
// *      tags:
// *        - actor
// *      summary: List all actors
// *      operationId: listActors
// *      responses:
// *        '200':
// *          description: An paged array of actors
// *          content:
// *            application/json:
// *              schema:
// *                $ref: '#/components/schemas/Actor'
// *        '400':
// *           description: Invalid status value
// *        '500':
// *           description: Internal server error
// */



actorRouter.get("/", accessTokenValidator, actorController.getActor);


// /**
// * @swagger
// * /actors/{actorId}:
// *    get:
// *      tags:
// *        - actor
// *      summary: Info for a specific actor
// *      operationId: getActorById
// *      parameters:
// *        - name: actorId
// *          in: path
// *          description: The actor ID
// *          required: true
// *          schema:
// *            type: integer
// *            format: int64
// *      responses:
// *            '200':
// *               description: Expected response to a valid request
// *               content:
// *                   application/json:
// *                     schema:
// *                       $ref: '#/components/schemas/Actor'
// *            '400':
// *               description: Invalid status value
// *            '404':
// *               description: Actor not found
// *            '500':
// *               description: Internal server error
// */
actorRouter.get("/:actorId", actorController.getActorById);


// /** 
// *@swagger
// * /actors:
// *    post:
// *      tags:
// *        - actor
// *      summary: Create a new actor
// *      operationId: createActor
// *      requestBody:
// *        description: Actor object that needs to be added to the store
// *        required: true
// *        content:
// *          application/json:
// *            schema:
// *              $ref: '#/components/schemas/Actor'
// *      responses:
// *        '201':
// *          description: Created
// *          content:
// *            application/json:
// *              schema:
// *                $ref: '#/components/schemas/Actor'
// *        '400':
// *           description: Invalid status value
// *        '500':
// *           description: Internal server error
// */
actorRouter.post("/", validate(createActorValidator), actorController.createActor);

// /**
// *@swagger
// * /actors/{actorId}:
// *    patch:
// *      tags:
// *        - actor
// *      summary: Update an existing actor
// *      operationId: updateActor
// *      parameters:
// *        - name: actorId
// *          in: path
// *          description: The actor ID
// *          required: true
// *          schema:
// *            type: integer
// *            format: int64
// *      requestBody:
// *        description: Actor object that needs to be updated
// *        required: true
// *        content:
// *          application/json:
// *            schema:
// *              $ref: '#/components/schemas/Actor'
// *      responses:
// *        '200':
// *          description: Updated
// *        '400':
// *           description: Invalid status value
// *        '404':
// *           description: Actor not found
// *        '500':
// *           description: Internal server error
// */
actorRouter.patch("/:actorId", actorController.updateActor);

// /**
//  * @swagger
//  *  /actors/{actorId}:
//  *      delete:
//  *        tags:
//  *          - actor
//  *        summary: Delete an actor
//  *        description: Delete
//  *        parameters:
//  *          - name: actorId
//  *            description: Actor ID
//  *            in: path
//  *            required: true
//  *        responses:
//  *              '200':
//  *                 description: Deleted
//  *              '404':
//  *                  description: Not found
//  *              '500':  
//  *                  description: Internal server error
//  */

actorRouter.delete("/:actorId", actorController.deleteActorById);
export default actorRouter;
