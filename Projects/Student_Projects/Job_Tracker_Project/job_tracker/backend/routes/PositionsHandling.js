import express from "express";
import isAuth from "../middleware/isAuth.js";
import { showPositionsPage, getAllPositions, showNewPositionPage, addPositionToDB } from "../controllers/positions.js"

const positionsRouter = express.Router();

positionsRouter.get("/", isAuth, showPositionsPage);

positionsRouter.get("/all", isAuth, getAllPositions);

positionsRouter.get("/new", isAuth, showNewPositionPage);

positionsRouter.post("/new", isAuth, addPositionToDB);

// positionsRouter.get("/positions:userId:positionId", (req, res) => {
//   const userId = req.params.userId;
//   const positionId = req.params.positionId;
//   try {
//     db("position")
//     .where("userid", userId).where("positionid", positionId)
//     .then(position =>
//                 res.send(position)
//         )
//   } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// positionsRouter.get("/positions:userId:positionId:companyId", (req, res) => {
//     const userId = req.params.userId;
//     const positionId = req.params.positionId;
//     const companyId = req.params.companyId;
//     try {
//       db("position")
//       .where("userid", userId).where("positionid", positionId).where("companyid", companyId)
//       .then(position =>
//                   res.send(position)
//           )
//     } catch (err) {
//           console.error(err);
//           res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

//   positionsRouter.post("/positions", (req, res) => {
//   const { url, title, requirements, keywords, discoveryDate, companyId, userId } = req.body;
//   try {
//     db("position")
//     .insert({ url: url, 
//             title: title, 
//             requirements: requirements, 
//             keywords: keywords, 
//             discoverydate: discoveryDate, 
//             companyid: companyId,
//             userid: userId }, ["url", "title", "requirements", "keywords", "discoverydate", "companyid", "userid"])
//     .then(position =>
//         res.send(position)
//     )
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// positionsRouter.put("/positions:userId:positionId", (req, res) => {
//   const positionId = req.params.positionId;
//   const userId = req.params.userId;
//   const { url, title, requirements, keywords, discoveryDate, processingDate, cvLink, clLink, salaryExpectation, applicationId, companyId } = req.body;
//   try {
//   db("position")
//         .where("positionid", positionId)
//         .where("userid", userId)
//         .update({
//             url: url, 
//             title: title, 
//             requirements: requirements, 
//             keywords: keywords, 
//             discoverydate: discoveryDate,
//             processingdate: processingDate,
//             cvlink: cvLink,
//             cllink: clLink,
//             salaryexpectation: salaryExpectation,
//             applicationid: applicationId, 
//             companyid: companyId,
//         },
//             ["url", "title", "requirements", "keywords", "discoverydate", "processingdate", "cvlink", "cllink", "salaryexpectation", "applicationid", "companyid", "userid"])
//         .then(position =>
//             res.send(position)
//         )
//   } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// positionsRouter.delete("/positions:userId:positionId", (req, res) => {
//   const positionId = req.params.positionId;
//   const userId = req.params.userId;
//   try {
//   db("position")
//         .where("positionid", positionId)
//         .where("userid", userId)
//         .del()
//         .then(position =>
//             res.send(position)
//         )
//   } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

export default positionsRouter;