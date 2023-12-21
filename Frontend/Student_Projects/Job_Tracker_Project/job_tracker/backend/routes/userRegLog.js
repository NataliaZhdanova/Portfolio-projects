import express from "express";
import { showAuthPage, regUser, loginUser } from "../controllers/users.js"
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const userRouter = express.Router();

userRouter.get("/", showAuthPage);

userRouter.post("/register", regUser);

userRouter.post("/login", loginUser);

// userRouter.get("/login", async (req, res) => {
//     const isLoggedIn = req
//         .get("Cookie")
//         .split(";")[1]
//         .trim()
//         .split("=")[1];
//     if (!isLoggedIn) {
//         return res.sendFile(path.join(__dirname, "..", "views", "auth.html"));
//         } 
//     res.sendFile(path.join(__dirname, "..", "views", "dashboard.html"));
// });

export default userRouter;
