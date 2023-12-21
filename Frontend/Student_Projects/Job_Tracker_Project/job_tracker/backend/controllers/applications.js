import dotenv from 'dotenv';
dotenv.config();

import { Application } from "../models/application.js";

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
  }
});

export function showApplicationsPage(req, res, next) {
    res.sendFile(path.join(__dirname, "..", "views", "applications.html"));
};

export function getAllApplications(req, res, next) { 
    try {
      let userid = req.session.user.userid;
      Application.fetchAll(userid).then(application => res.send(application));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export function showNewApplicationPage(req, res, next) {
    res.sendFile(path.join(__dirname, "..", "views", "newApplication.html"));
  };

  export async function addApplicationToDB(req, res) {
    try {
        const { status, senddate, positionid } = req.body;
        const application = new Application(status, senddate, positionid);

        let userid = req.session.user.userid;
  
        if (!status || !senddate ) {
            return res.status(400).json({ error: "Please provide the status and send date of an application" });
        }
  
        const existingApplication = await db("application").where("positionid", positionid).first();
        if (existingApplication) {
            return res.status(409).redirect("/").json({ error: "Application for this Position already exists" });
        }
  
        await application.save(userid);
  
        res.status(200).json({ message: "Application added successfully" });
    } catch (error) {
        console.error("Error adding application:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  };