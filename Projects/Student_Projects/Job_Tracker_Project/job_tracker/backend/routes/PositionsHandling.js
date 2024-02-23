import express from "express";
import tokenAuth from "../middleware/tokenAuth.js";
import { getAllPositions, AddPositionToDB, RemovePositionFromDB, UpdatePositionInDB, GetPositionsForCompany, GetPositionById } from "../controllers/positions.js"

const positionsRouter = express.Router();
positionsRouter.use(tokenAuth);

positionsRouter.get("/all/:userid", getAllPositions);
positionsRouter.get("/all/:companyid", GetPositionsForCompany);
positionsRouter.post("/new", AddPositionToDB);
positionsRouter.get("/:positionid", GetPositionById);
positionsRouter.delete("/delete/:positionid", RemovePositionFromDB);
positionsRouter.put("/update/:positionid", UpdatePositionInDB);

export default positionsRouter;