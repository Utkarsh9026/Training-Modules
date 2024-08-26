import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/signup", signup);
AuthRoutes.post("/signin", signin);

export default AuthRoutes;
