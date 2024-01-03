// Authentication is handled by the following files:
// /pages/Authentication.js - displays components and sends data to the server
// /components/AuthForm.js - login component, only HTML
// /components/RegForm.js - registration component, only HTML
// /backend/server.js - keeps session middleware
// /backend/routes/userRegLog.js - (this file) - router
// /backend/models/user.js - user model keeps the CRUD DB logic
// /backend/controllers/users.js - keeps the login/registration data processing logic and creates a session

import express from "express";
import { showAuthPage, regUser, loginUser } from "../controllers/users.js"

const userRouter = express.Router();

userRouter.get("/", showAuthPage);

userRouter.post("/register", regUser);

userRouter.post("/login", loginUser);

export default userRouter;
