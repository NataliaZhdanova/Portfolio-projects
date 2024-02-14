// DotEnv Config
import dotenv from 'dotenv';
dotenv.config();

// Common Imports
import express from "express";
// import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import cors from "cors";

// Router Imports
import positionsRouter from "./routes/PositionsHandling.js";
import applicationsRouter from "./routes/ApplicationsHandling.js";
import userRouter from "./routes/userRegLog.js";
import companyRouter from "./routes/CompaniesHandling.js";

import tokenAuth from "./middleware/tokenAuth.js";

// Express App
const app = express();

// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'x-csrf-token', 'Authorization'],
  credentials: true
}));

// Port configuration
const port = 9000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

// Routes
app.use("/auth", userRouter);

// Auth-protected routes
app.use(tokenAuth);
app.use("/applications", applicationsRouter);
app.use("/positions", positionsRouter);
app.use("/companies", companyRouter);

app.get("*", (req, res) => res.sendStatus(404))