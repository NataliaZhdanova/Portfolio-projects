import express from "express";
import { showApplicationsPage, getAllApplications, showNewApplicationPage, addApplicationToDB } from "../controllers/applications.js"

const applicationsRouter = express.Router();

applicationsRouter.get("/", showApplicationsPage);

applicationsRouter.get("/all", getAllApplications);

applicationsRouter.get("/new", showNewApplicationPage);

applicationsRouter.post("/new", addApplicationToDB);

export default applicationsRouter;