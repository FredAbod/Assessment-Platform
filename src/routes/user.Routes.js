// Importing required modules and packages
import express from "express";
const router = express.Router();
import { loginUser, signUp } from "../controller/user.Controller.js";

// Endpoint for user registration
router.post("/signup", signUp);

// Endpoint for user login
router.post("/login", loginUser);

// Exporting the router for use in other modules
export default router;
