import express from "express";
import isAuth from "../middleware/isAuth.js";
import { showApplicationsPage, getAllApplications, showNewApplicationPage, addApplicationToDB } from "../controllers/applications.js"

const applicationsRouter = express.Router();

applicationsRouter.get("/", isAuth, showApplicationsPage);

applicationsRouter.get("/all", isAuth, getAllApplications);

applicationsRouter.get("/new", isAuth, showNewApplicationPage);

applicationsRouter.post("/new", isAuth, addApplicationToDB);

export default applicationsRouter;