import dotenv from 'dotenv';
dotenv.config();

import { Position } from "../models/position.js";

import knex from "knex";

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

// Get all positions - for /positions/all route
export function getAllPositions(req, res, next) {
  try {
      let userid = req.params.userid;
      Position.fetchAll(userid).then(position => {
          res.send(position);
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}; 

// Add a new position to the database

  export async function AddPositionToDB(req, res) {
    try {
        const { companyid, title, url, requirements, keywords, discoverydate } = req.body;
        const position = new Position(url, title, requirements, keywords, discoverydate, companyid); 
        let userid = req.params.userid;    
  
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

// Delete a position from the database

export function RemovePositionFromDB(req, res, next) {
  try {
      let positionid = req.params.positionid;
      Position.delete(positionid).then(() => {
          res.status(200).json({ message: "Position deleted successfully" });
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update a position in the database

export function UpdatePositionInDB(req, res, next) {
  try {
      let positionid = req.params.positionid;
      let { title, url, requirements, keywords } = req.body;
      Position.update(positionid, title, url, requirements, keywords).then(() => {
          res.status(200).json({ message: "Position updated successfully" });
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}