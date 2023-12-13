import { loginController, logoutController, refreshTokenController, registerController } from "../controllers/auth.controller";
import { Router } from "express";
import { accessTokenValidator, refreshTokenValidator } from "../middleware/auth.middleware";

const authRouter = Router();


authRouter.post('/login', loginController);
authRouter.post('/register', registerController);
authRouter.post('/logout', accessTokenValidator, refreshTokenValidator, logoutController);
authRouter.post('/refresh-token', refreshTokenValidator, refreshTokenController);
export default authRouter; 