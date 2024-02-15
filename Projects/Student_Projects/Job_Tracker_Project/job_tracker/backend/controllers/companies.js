// DotEnv Config
import dotenv from 'dotenv';
dotenv.config();

// Common Imports
import { Company } from "../models/company.js";

import knex from "knex";

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

// Get all companies - for /companies/all route
export function getAllCompanies(req, res, next) {
    try {
        let userid = req.params.userid;
        Company.fetchAll(userid).then(company => {
            res.send(company);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}; 

// Add a new company to the database
export async function AddCompanyToDB(req, res) {
    try {
        const { companyname, url, businessoverview, userid } = req.body;
        const company = new Company(companyname, url, businessoverview, userid);
                
        if (!companyname || !url) {
            return res.status(400).json({ error: "Please provide the name of the company and the URL" });
        }

        const existingCompany = await db("company").where("companyname", companyname).where("userid", userid).first();
        if (existingCompany) {
            return res.status(409).redirect("/");
        }
        
        await company.save();
        res.status(200).json({ message: "Company added successfully" });

    } catch (error) {
        console.error("Error adding company:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a company from the database

export function RemoveCompanyFromDB(req, res, next) {
    try {
        let companyid = req.params.companyid;
        Company.delete(companyid).then(() => {
            res.status(200).json({ message: "Company deleted successfully" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update a company in the database

export function UpdateCompanyInDB(req, res, next) {
    try {
        let companyid = req.params.companyid;
        let { companyname, url, businessoverview } = req.body;
        Company.update(companyid, companyname, url, businessoverview).then(() => {
            res.status(200).json({ message: "Company updated successfully" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}