import { Application } from "../models/application.js";

// Get all applications - for /applications/all route
export function getAllApplications(req, res, next) {
  try {
      let userid = req.params.userid;
      Application.fetchAll(userid).then(application => {
          res.send(application);
      });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export function GetApplicationById(req, res, next) {
  try {
      let applicationid = req.params.applicationid;
      Application.fetchById(applicationid).then(application => {
          res.send(application);
      });
  } catch (error) {
      console.error("Error fetching application:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function GetApplicationsForCompany(req, res, next) {
  try {
      let companyid = req.params.companyid;

      const application = await Application.fetchAllForCompany(companyid);

      res.status(200).json(application);

  } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function GetApplicationForPosition(req, res, next) {
  try {
      let positionid = req.params.positionid;

      const application = await Application.fetchAllForPosition(positionid);

      res.status(200).json(application);

  } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new application to the database

export async function AddApplicationToDB(req, res, next) {
  try {
    const { status, senddate, positionid, userid } = req.body;
    const application = new Application(status, senddate, positionid, userid);

    if (!status || !senddate ) {
      return res.status(400).json({ error: "Please provide the status and send date of an application" });
    }
  
    const existingApplication = await application.isExisting();
    if (existingApplication) {
      return res.status(409).json({ error: "Application for this position already exists" });
    }
  
    await application.save();

    const savedApplication = await application.fetch();
  
    res.status(201).json({savedApplication, message: "Application added successfully" });

  } catch (error) {
      console.error("Error adding application:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an application from the database

export async function RemoveApplicationFromDB(req, res, next) {
  try {
      let applicationid = req.params.applicationid;

      const deletedApplication = await Application.fetchById(applicationid);

      await Application.delete(applicationid);

      res.status(200).json({deletedApplication, message: "Application deleted successfully" });

  } catch (error) {
      console.error("Error deleting application:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update an application in the database - for /applications/update/:applicationid route

export async function UpdateApplicationInDB(req, res, next) {
  try {
      let applicationid = req.params.applicationid;
      let { status } = req.body;

      await Application.update(applicationid, status);

      const updatedApplication = await Application.fetchById(applicationid);

      res.status(200).json({updatedApplication, message: "Application updated successfully" });

  } catch (error) {
    console.error("Error updating application:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}