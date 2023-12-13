import { checkSchema } from 'express-validator';
export const createActorValidator = checkSchema(
    {
        firstName: {
            notEmpty: true,
            isString: true,
            errorMessage: 'firstName is required',
            trim: true,
            escape: true,

        },
        lastName: {
            notEmpty: true,
            isString: true,
            errorMessage: 'lastName is required',
            trim: true,
            escape: true,
        },

    }
)

export const getActorValidator = checkSchema({
    actorId: {
        notEmpty: true,
        isInt: true,
        errorMessage: 'id must be an integer',
    }
})

