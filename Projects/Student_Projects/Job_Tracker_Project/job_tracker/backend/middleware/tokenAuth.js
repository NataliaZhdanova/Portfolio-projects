// DotEnv Config
import dotenv from 'dotenv';
dotenv.config();

// Common Imports
import jwt from "jsonwebtoken";

export default function tokenAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodedToken.userId, email: decodedToken.email };
        next();
    } catch (error) {
        console.error("Error during token verification:", error);
        res.status(401).json({ error: "Unauthorized" });
    }   
}