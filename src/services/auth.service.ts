import { User } from "../entity/user.entity";
import { signToken } from "../utils/jwt.util";
import userService from "./user.service";
import bcrypt from 'bcryptjs';

class AuthService {
    private signAccessToken = (userId: string) => {
        return signToken({
            payload: {
                userId,
                tokenType: 'accessToken'
            },
            privateKey: 'sakila@group7-access',
            options: {
                expiresIn: '15m'
            }
        });
    };
    private signRefreshToken = (userId: string) => {
        return signToken({
            payload: {
                userId,
                tokenType: 'refreshToken'
            },
            privateKey: 'sakila@group7-refresh',
            options: {
                expiresIn: '20s'
            }
        });
    };



    login = async (payload: any) => {
        const { email, password } = payload;
        try {
            const foundUser = await userService.findUserByEmail({ email: email.toLowerCase() });
            console.log("🚀 ~ file: auth.service.ts:46 ~ AuthService ~ login= ~ foundUser:", foundUser)

            if (!foundUser) {
                throw new Error('User not found');
            }
            if (!foundUser.verified) {
                throw new Error('User not verified');
            }
            if (!(await bcrypt.compare(password, foundUser.password))) {
                throw new Error('email or password is incorrect');
            }
            const accessToken = await this.signAccessToken(foundUser.userId.toString());
            const refreshToken = await this.signRefreshToken(foundUser.userId.toString());
            foundUser.refreshToken = (refreshToken as string);
            await userService.update(foundUser.userId, foundUser);

            return {
                accessToken,
                refreshToken
            };

        } catch (err) {
            console.log(err);
        }
    }
    register = async (payload: any) => {
        const newUser = await userService.create({
            email: payload.email.toLowerCase(),
            password: payload.password,
        });
        // console.log("🚀 ~ file: auth.service.ts:12 ~ AuthService ~ result:", result)
        const accessToken = await this.signAccessToken(newUser.userId.toString());
        const refreshToken = await this.signRefreshToken(newUser.userId.toString());
        newUser.refreshToken = (refreshToken as string);
        const user = await userService.update(newUser.userId, newUser);
        return {
            accessToken,
            refreshToken
        }
    }

    logout = async (refreshToken: string) => {
        const foundUser = await userService.findUserByRefreshToken({ refreshToken });
        if (!foundUser) {
            throw new Error('User not found');
        }
        foundUser.refreshToken = '';
        await userService.update(foundUser.userId, foundUser);
        return {
            message: 'Logout successfully'
        }
    }

    refreshToken = async (refreshToken: string, userId: string) => {
        const updateUser = new User();
        updateUser.userId = +userId;
        const [newAccessToken, newRefreshToken] = await Promise.all([
            this.signAccessToken(userId),
            this.signRefreshToken(userId),
            // userService.update({ refreshToken: refresh_token })
        ])
        updateUser.refreshToken = newRefreshToken;
        userService.update(updateUser.userId, updateUser);
        // const decoded_refresh_token = await this.decodeRefreshToken(new_refresh_token)
        // await databaseService.refreshTokens.insertOne(
        //     new RefreshToken({
        //         user_id: new ObjectId(user_id),
        //         token: new_refresh_token,
        //         iat: decoded_refresh_token.iat,
        //         exp: decoded_refresh_token.exp
        //     })
        // )
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        }
    }
}

export default new AuthService();