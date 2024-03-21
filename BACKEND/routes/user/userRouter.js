import { Router } from "express";

import userController from '../../controller/users/userController.js'

const userRouter = Router();
userRouter.post("/users/register", userController.createUser);
userRouter.get("/users/login", userController.loginUser);
export default userRouter;
