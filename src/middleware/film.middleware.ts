import { checkSchema } from 'express-validator';
export const createFilmValidator = checkSchema(
    {
        title: {
            notEmpty: true,
            isString: true,
            errorMessage: 'title is required',
            isLength: {
                options: { min: 1, max: 255 },
                errorMessage: 'title must be between 3 and 255 chars long',
            }

        },
        description: {
            isString: true,
        },
        releaseYear: {
            isInt: true,
        },
        languageId: {
            notEmpty: true,
            isInt: true,
        },
        originalLanguageId: {
            isInt: true,
        },
        rentalDuration: {
            isInt: true,
            notEmpty: true,
        },
        rentalRate: {
            isDecimal: true,
            notEmpty: true,
        },
        length: {
            isInt: true,
        },
        replacementCost: {
            isDecimal: true,
            notEmpty: true,
        },
        rating: {
            isString: true,
        },
        specialFeatures: {
            isString: true,
        },
        lastUpdate: {
            isISO8601: true
        }
    }
)

export const getFilmValidator = checkSchema({
    id: {
        notEmpty: true,
        isInt: true,
        errorMessage: 'filmId must be an integer',
    }
})