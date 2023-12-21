import dotenv from 'dotenv';
dotenv.config();

import { User } from "../models/user.js";

import knex from "knex";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
  }
});


export function showAuthPage(req, res, next) {
    res.sendFile(path.join(__dirname, "..", "views", "auth.html"));
};

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

        res.status(200).json({ message: "User registered successfully" });
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
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
                console.log(err);
                res.redirect("/dashboard");
            });
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// export function logout(req, res, next) {
//     req.session.destroy(err => {
//       console.log(err);
//       res.redirect('/');
//     });
//   };