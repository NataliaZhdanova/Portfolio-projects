import express from "express";
import tokenAuth from "../middleware/tokenAuth.js";
import { getAllCompanies, AddCompanyToDB } from "../controllers/companies.js"

const companyRouter = express.Router();
companyRouter.use(tokenAuth);

companyRouter.get("/all/:userid", getAllCompanies);
companyRouter.post("/new", AddCompanyToDB);

export default companyRouter;
