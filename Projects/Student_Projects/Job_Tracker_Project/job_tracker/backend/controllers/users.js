// Authentication is handled by the following files:
// /pages/Authentication.js - displays components and sends data to the server
// /components/AuthForm.js - login component, only HTML
// /components/RegForm.js - registration component, only HTML
// /backend/server.js - keeps session middleware
// /backend/routes/userRegLog.js - router
// /backend/models/user.js - user model keeps the CRUD DB logic
// /backend/middleware/tokenAuth.js - token verification module
// /backend/controllers/users.js - (this file) - keeps the login/registration data processing logic

// DotEnv Config
import dotenv from 'dotenv';
dotenv.config();

// Common Imports
import { User } from "../models/user.js";

import knex from "knex";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Database Connection
const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
  },
  pool: { min: 0, max: 5, idleTimeoutMillis: 10000, reapIntervalMillis: 1000 }
});

// The user registers here
export async function regUser(req, res) {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User(username, email, hashedPassword);

            if (!username || !email || !password) {
                return res.status(400).json({ error: "Please provide all required fields" });
            }

            const existingUser = await db("user").where("email", email).first();
            if (existingUser) {
                return res.status(409).json({ error: "User with this email already exists" });
            }       

            await user.save();

            return res.status(200).json({ message: "User registered successfully" });

        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
};

// The user logs in here
export async function loginUser(req, res) {
     
    try {
        const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Please provide both email and password" });
            }

        const user = await db("user").where("email", email).first();
            if (!user) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

        const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: "Invalid credentials" });
            } else {

                let token = jwt.sign({ userId: user.userid, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
                
                return res.status(200).json({ userId: user.userid, email: user.email, token: token });
                
            }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};
