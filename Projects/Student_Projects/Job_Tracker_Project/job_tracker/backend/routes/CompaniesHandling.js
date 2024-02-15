import express from "express";
import tokenAuth from "../middleware/tokenAuth.js";
import { getAllCompanies, AddCompanyToDB, RemoveCompanyFromDB, UpdateCompanyInDB } from "../controllers/companies.js"

const companyRouter = express.Router();
companyRouter.use(tokenAuth);

companyRouter.get("/all/:userid", getAllCompanies);
companyRouter.post("/new", AddCompanyToDB);
companyRouter.delete("/delete/:companyid", RemoveCompanyFromDB);
companyRouter.put("/update/:companyid", UpdateCompanyInDB);

export default companyRouter;
