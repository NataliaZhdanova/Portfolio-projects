import { Position } from "../models/position.js";

// Get all positions - for /positions/all route
export function getAllPositions(req, res, next) {
  try {
      let userid = req.params.userid;
      Position.fetchAll(userid).then(position => {
          res.send(position);
      });
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; 

export function GetPositionById(req, res, next) {
  try {
      let positionid = req.params.positionid;
      Position.fetchById(positionid).then(position => {
          res.send(position);
      });
  } catch (error) {
      console.error("Error fetching position:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// export function GetPositionsForCompany(req, res, next) {
//   try {
//       let companyid = req.params.companyid;
//       Position.fetchAllForCompany(companyid).then(position => {
//         res.send(position);
//     });      
//   } catch (error) {
//       console.error("Error fetching positions:", error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export async function GetPositionsForCompany(req, res, next) {
  try {
      let companyid = req.params.companyid;
      // const positions = await Position.fetchAllForCompany(companyid);
      // res.status(200).json(positions);     

      const position = await Position.fetchAllForCompany(companyid);
      res.status(200).json(position);

  } catch (error) {
      console.error("Error fetching positions:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Add a new position to the database

export async function AddPositionToDB(req, res, next) {
  try {
      const { url, title, requirements, keywords, discoverydate, companyid, userid } = req.body;
      const position = new Position(url, title, requirements, keywords, discoverydate, companyid, userid); 
 
      if (!title || !url || !discoverydate) {
          return res.status(400).json({ error: "Please provide the name, URL and discovery date of a position" });
      }
  
      const existingPosition = await position.isExisting();
      if (existingPosition) {
          return res.status(409).json({ error: "Position with this URL for this company already exists" });
      }
  
      await position.save();

      const savedPosition = await position.fetch();
  
      res.status(201).json({savedPosition, message: "Position added successfully" });

  } catch (error) {
      console.error("Error adding position:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a position from the database

export async function RemovePositionFromDB(req, res, next) {
  try {
      let positionid = req.params.positionid;

      const deletedPosition = await Position.fetchById(positionid);

      await Position.delete(positionid);

      res.status(200).json({deletedPosition, message: "Position deleted successfully" });

  } catch (error) {
      console.error("Error deleting position:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update a position in the database - for /positions/update/:positionid route

export async function UpdatePositionInDB(req, res, next) {
  try {
      let positionid = req.params.positionid;
      let { title, url, requirements, keywords } = req.body;

      await Position.update(positionid, title, url, requirements, keywords);

      const updatedPosition = await Position.fetchById(positionid);

      res.status(200).json({updatedPosition, message: "Position updated successfully" });

  } catch (error) {
    console.error("Error updating position:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}