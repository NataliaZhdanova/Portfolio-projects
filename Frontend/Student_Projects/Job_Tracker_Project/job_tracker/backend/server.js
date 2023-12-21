import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";

import { error404 } from "./controllers/error.js";
import positionsRouter from "./routes/PositionsHandling.js";
import applicationsRouter from "./routes/ApplicationsHandling.js";
import userRouter from "./routes/userRegLog.js";
import companyRouter from "./routes/CompaniesHandling.js";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import session from "express-session";
import pg from "pg";
import pgConnector from "connect-pg-simple";

// import csrf from "csurf";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PgSession = pgConnector(session);

const pgPool = new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// const csrfProtection = csrf({ cookie: true });

app.use(session({
    store: new PgSession({
      pool: pgPool,
      tableName: "sessions",
    }),
    secret: "thisShouldBeALongValue",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }
  }));

// app.use(csrfProtection);

const port = 9000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

app.use("/applications", applicationsRouter);
app.use("/positions", positionsRouter);
app.use("/companies", companyRouter);
app.use("/auth", userRouter);

app.use(error404);
// app.use((err, req, res, next) => {
//   if (err.code === 'EBADCSRFTOKEN') {
//     res.status(403).send('CSRF token validation failed');
//   } else {
//     next(err);
//   }
// });
