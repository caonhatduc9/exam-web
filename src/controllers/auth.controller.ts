import { Request, Response } from "express"
import userService from "../services/user.service";
import authService from "../services/auth.service";

export const loginController = async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    return res.status(200).json({
        message: 'Login successfully',
        result
    });
}
export const registerController = async (req: Request, res: Response) => {
    console.log("dđ",req.body);
    const result = await authService.register(req.body);
    console.log("🚀 ~ file: auth.controller.ts:15 ~ registerController ~ result:", result)
    res.json({
        message: 'Register successfully',
        result
    })
}

export const logoutController = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const message = await authService.logout(refreshToken);
    return res.status(200).json({ message });
}
export const refreshTokenController = async (req: any, res: Response) => {
    const { refreshToken } = req.body;
    const userId = req.decodedRefreshToken.userId;
    const result = await authService.refreshToken(refreshToken, userId.toString());
    return res.json({
        message: 'Refresh token successfully',
        result
    });
}