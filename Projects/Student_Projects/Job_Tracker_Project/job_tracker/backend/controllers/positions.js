import dotenv from 'dotenv';
dotenv.config();

import { Position } from "../models/position.js";

import knex from "knex";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

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
  },
  pool: { min: 0, max: 5, idleTimeoutMillis: 10000, reapIntervalMillis: 1000 }
});

export function showPositionsPage(req, res, next) {
    res.sendFile(path.join(__dirname, "..", "views", "positions.html"));
};

export function getAllPositions(req, res, next) { 
    try {
      let userid = req.session.user.userid;
      Position.fetchAll(userid).then(position => res.send(position));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export function showNewPositionPage(req, res, next) {
    res.sendFile(path.join(__dirname, "..", "views", "newPosition.html"));
  };

  export async function addPositionToDB(req, res) {
    try {
        const { companyid, title, url, requirements, keywords, discoverydate } = req.body;
        const position = new Position(url, title, requirements, keywords, discoverydate, companyid);
        let userid = req.session.user.userid;
      
  
        if (!title || !url || !discoverydate) {
            return res.status(400).json({ error: "Please provide the name, URL and discovery date of a position" });
        }
  
        const existingPosition = await db("position").where("url", url).where("userid", userid).first();
        if (existingPosition) {
            return res.status(409).redirect("/").json({ error: "Position with this URL already exists" });
        }
  
        await position.save(userid);
  
        res.status(200).json({ message: "Position added successfully" });
    } catch (error) {
        console.error("Error adding position:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  };