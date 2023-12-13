
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

/**
* @swagger
* components:
*    schemas:
*        Actor:
*           type: object
*           properties:
*               actorId:
*                   type: integer
*                   example: 1
*               firstName:
*                   type: string
*                   example: "John"
*               lastName:
*                   type: string
*                   example: "Doe"
*               lastUpdate:
*                   type: string
*                   format: date-time
*                   example: "2023-02-15T04:34:33.727"
*/

@Entity()
export class Actor {
    @PrimaryGeneratedColumn({ type: 'int', name: 'actor_id' })
    actorId: number
    @Column('varchar', { name: 'first_name' })
    firstName: string
    @Column('varchar', { name: 'last_name' })
    lastName: string
    @Column('timestamp', { name: 'last_update' })
    lastUpdate: Date;
}