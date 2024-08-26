import express from "express";

//Middleware import
import authMiddleware from "../middleware/authMiddleware.js";

//Controller import
import {
  getProgress,
  updateProgress,
} from "../controllers/progress.controller.js";

const ProgressRoutes = express.Router();

ProgressRoutes.get("/getProgress", authMiddleware, getProgress);
ProgressRoutes.post("/updateProgress", authMiddleware, updateProgress);

export default ProgressRoutes;
