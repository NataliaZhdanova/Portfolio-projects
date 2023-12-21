import express from "express";
import isAuth from "../middleware/isAuth.js";
import { showCompaniesPage, getAllCompanies, showNewCompanyPage, AddCompanyToDB } from "../controllers/companies.js"

const companyRouter = express.Router();

companyRouter.get("/", isAuth, showCompaniesPage);

companyRouter.get("/all", isAuth, getAllCompanies);

companyRouter.get("/new", isAuth, showNewCompanyPage);

companyRouter.post("/new", isAuth, AddCompanyToDB);

export default companyRouter;
