import jwt, { SignOptions } from 'jsonwebtoken';
import { ErrorWithStatus } from './error.util';

export const signToken = ({
    payload,
    privateKey,
    options = {
        algorithm: 'HS256'
    }
}: {
    payload: string | Buffer | object;
    privateKey: string;
    options?: SignOptions;
}) => {
    return jwt.sign(payload, privateKey, options);
};

export const verifyToken = (token: string, secretKey = 'sakila@group7-access') => {
    console.log('🚀 ~ file: jwt.utils.ts:26 ~ verifyToken ~ token', token);
    return new Promise<jwt.JwtPayload>((resolve, rejects) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.log('🚀 ~ file: jwt.utils.ts:29 ~ jwt.verify ~ err', err);
                rejects(err);
                // throw new ErrorWithStatus({ message: 'Token is invalid', status: 401 });
            }
            resolve(decoded as jwt.JwtPayload);
        });
    });
};

export const verifyAccessToken = async (accessToken: string, req?: any) => {
    if (!accessToken) {
        throw new ErrorWithStatus({
            message: "accessToken is required",
            status: 401
        })
    }
    try {
        const decodedAuth = await verifyToken(
            accessToken,
            // secretOrPublicKey: ''
        )
        if (req) {
            req.decodedAuth = decodedAuth
            return true
        }
        return decodedAuth
    } catch (error) {
        throw new ErrorWithStatus({
            message: "jwt expired or invalid",
            status: 401
        })
    }
}


