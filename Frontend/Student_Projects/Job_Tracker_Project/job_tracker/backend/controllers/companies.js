import dotenv from 'dotenv';
dotenv.config();

import { Company } from "../models/company.js";

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

export function showCompaniesPage(req, res, next) {
    // const csrfToken = req.csrfToken();
    // res.cookie('XSRF-TOKEN', csrfToken);
    // res.sendFile(path.join(__dirname, "..", "views", "companies.html"), { csrfToken });
    res.sendFile(path.join(__dirname, "..", "views", "companies.html"));
};

export function getAllCompanies(req, res, next) {
    try {
        let userid = req.session.user.userid;
        Company.fetchAll(userid).then(company => {
            res.send(company);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export function showNewCompanyPage(req, res, next) {
    // const csrfToken = req.csrfToken();
    // res.cookie('XSRF-TOKEN', csrfToken);
    // res.sendFile(path.join(__dirname, "..", "views", "newCompany.html"), { csrfToken });
    res.sendFile(path.join(__dirname, "..", "views", "newCompany.html"));
}

export async function AddCompanyToDB(req, res) {
    try {
        const { companyname, url, startup, businessoverview } = req.body;
        const company = new Company(companyname, url, startup, businessoverview);
        let userid = req.session.user.userid;
        
        if (!companyname || !url) {
            return res.status(400).json({ error: "Please provide the name of the company and the URL" });
        }

        const existingCompany = await db("company").where("companyname", companyname).where("userid", userid).first();
        if (existingCompany) {
            return res.status(409).redirect("/").json({ error: "Company with this name already exists" });
        }
        
        await company.save(userid);
        res.status(200).json({ message: "Company added successfully" });

    } catch (error) {
        console.error("Error adding company:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};