// Importing required modules and packages
import express from "express";
import { addQuestions, getSubjects, saveSubject, solutions } from "../controller/subject.Controller.js";
import { isAuth } from "../config/auth.js";
const router = express.Router();

router.get('/getSubject', getSubjects)
router.post('/addSubject', saveSubject)
router.post('/addQuestions/:subjectId', addQuestions)
router.post('/solution/:subjectId', isAuth, solutions)

// Exporting the router for use in other modules
export default router;
