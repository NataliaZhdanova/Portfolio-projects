// Common Imports
import { Company } from "../models/company.js";

// Get all companies - for /companies/all/:userid route

export async function getAllCompanies(req, res, next) {
    try {
        let userid = req.params.userid;

        const companies = await Company.fetchAll(userid);

        res.status(200).json(companies);

    } catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};  

export async function GetCompanyById(req, res, next) {
    try {
        let companyid = req.params.companyid;

        const company = await Company.fetchById(companyid);

        res.status(200).json(company);

    } catch (error) {
        console.error("Error fetching company:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add a new company to the database - for /companies/new route

export async function AddCompanyToDB(req, res, next) {
    try {
        const { companyname, url, businessoverview, userid } = req.body;
        const company = new Company(companyname, url, businessoverview, userid);
                
        if (!companyname || !url) {
            return res.status(400).json({ error: "Please provide the name of the company and the URL" });
        }

        const existingCompany = await company.isExisting();
        if (existingCompany) {
            return res.status(409).json({ error: "Company with this name and URL already exists" });
        }
        
        await company.save();
        
        const savedCompany = await company.fetch();

        res.status(201).json({savedCompany, message: "Company added successfully" });

    } catch (error) {
        console.error("Error adding company:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a company from the database - for /companies/delete/:companyid route

export async function RemoveCompanyFromDB(req, res, next) {
    try {
        let companyid = req.params.companyid;

        const deletedCompany = await Company.fetchById(companyid);

        await Company.delete(companyid);

        res.status(200).json({deletedCompany, message: "Company deleted successfully" });
        
    } catch (error) {
        console.error("Error deleting company:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update a company in the database - for /companies/update/:companyid route

export async function UpdateCompanyInDB(req, res, next) {
    try {
        let companyid = req.params.companyid;
        let { companyname, url, businessoverview } = req.body;

        await Company.update(companyid, companyname, url, businessoverview);

        const updatedCompany = await Company.fetchById(companyid);

        res.status(200).json({updatedCompany, message: "Company updated successfully" });
        
    } catch (error) {
        console.error("Error updating company:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
} 