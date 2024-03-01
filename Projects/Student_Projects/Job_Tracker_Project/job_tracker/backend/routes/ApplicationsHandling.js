import express from "express";
import tokenAuth from "../middleware/tokenAuth.js";
import { getAllApplications, AddApplicationToDB, RemoveApplicationFromDB, UpdateApplicationInDB, GetApplicationsForCompany, GetApplicationById,  GetApplicationForPosition } from "../controllers/applications.js"

const applicationsRouter = express.Router();
applicationsRouter.use(tokenAuth);

applicationsRouter.get("/all/:userid", getAllApplications);
applicationsRouter.get("/forcompany/:companyid", GetApplicationsForCompany);
applicationsRouter.get("/forposition/:positionid", GetApplicationForPosition);
applicationsRouter.post("/new", AddApplicationToDB);
applicationsRouter.get("/:applicationid", GetApplicationById);
applicationsRouter.delete("/delete/:applicationid", RemoveApplicationFromDB);
applicationsRouter.put("/update/:applicationid", UpdateApplicationInDB);

export default applicationsRouter;


