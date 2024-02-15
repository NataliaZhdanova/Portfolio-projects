import express from "express";
import tokenAuth from "../middleware/tokenAuth.js";
import { getAllPositions, AddPositionToDB, RemovePositionFromDB, UpdatePositionInDB } from "../controllers/positions.js"

const positionsRouter = express.Router();
positionsRouter.use(tokenAuth);

positionsRouter.get("/all/:userid", getAllPositions);
positionsRouter.post("/new", AddPositionToDB);
positionsRouter.delete("/delete/:positionid", RemovePositionFromDB);
positionsRouter.put("/update/:positionid", UpdatePositionInDB);

export default positionsRouter;