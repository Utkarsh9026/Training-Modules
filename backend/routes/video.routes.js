import express from "express";

//Middleware import
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

//Controller import
import {
  createVideo,
  deleteVideo,
  getVideo,
  getVideoById,
  updateVideo,
} from "../controllers/video.controller.js";

const VideosRoutes = express.Router();

VideosRoutes.get("/getVideo", authMiddleware, getVideo);
VideosRoutes.get("/getVideoById/:id", authMiddleware, getVideoById);
VideosRoutes.post(
  "/createVideo",
  authMiddleware,
  roleMiddleware(["admin"]),
  createVideo
);
VideosRoutes.put(
  "/updateVideo/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateVideo
);
VideosRoutes.delete(
  "/deleteVideo/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteVideo
);

export default VideosRoutes;
