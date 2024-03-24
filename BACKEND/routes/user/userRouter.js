import { Router } from "express";

import userController from "../../controller/users/userController.js";
const userRouter = Router();
userRouter.post("/check", userController.checkUserExist);
userRouter.post("/checkusername", userController.checkUsernameExist);
userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/google", userController.googleAuth);
userRouter.get("/google/callback", userController.googleAuthCallback);
userRouter.get("/checkauth", userController.checkAuthentication);
export default userRouter;

// http://localhost:4000/api/users/google/callback
// http://localhost:4000/api/users/google
