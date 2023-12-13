import { checkSchema } from "express-validator"
import { validate } from "../validator"
import { verifyAccessToken, verifyToken } from "../utils/jwt.util"
import { ErrorWithStatus } from "../utils/error.util";
import userService from "../services/user.service";
import { JsonWebTokenError } from "jsonwebtoken";

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            // if (!value) throw new ErrorWithStatus({ message: 'Not authorized', status: 401 })
            // const accessToken = value.split(' ')[1];
            // if (accessToken === '') {
            //   console.log("chek1c");
            //   throw new ErrorWithStatus({ message: 'Not authorized', status: 401 });
            //   console.log("chek2c");
            // }
            // return await verifyToken(accessToken);

            const access_token = (value || '').split(' ')[1]
            return await verifyAccessToken(access_token, req as Request)
            //   const user = await databaseService.users.findOne({ accessToken: accessToken });
          }
        }
      }
    },
    ['headers']
  )
);

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refreshToken: {
        custom: {
          options: async (value: string, { req }) => {
            try {
              const [decodedRefreshToken, refreshToken] = await Promise.all([
                verifyToken(value, 'sakila@group7-refresh'),
                userService.findUserByRefreshToken({ refreshToken: value })
              ]);
              if (!refreshToken) {
                throw new ErrorWithStatus({ message: 'Refresh token is invalid or not exist', status: 401 });
              }
              req.decodedRefreshToken = decodedRefreshToken;

              console.log('🚀 ~ file: users.middlewares.ts:139 ~ options: ~ decodedRefreshToken:', decodedRefreshToken);
              return true;
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({ message: 'Refresh token is invalid', status: 401 });
              }
              throw error;
              // throw new ErrorWithStatus({ message: 'Refresh token is invalid', status: 401 });
            }
          }
        }
      }
    },
    ['body']
  )
);