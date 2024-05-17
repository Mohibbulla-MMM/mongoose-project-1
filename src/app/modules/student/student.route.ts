import express from "express";
import { StudentConrollers } from "./student.controller";

const router = express.Router();

router.post("/create-student", StudentConrollers.createStudent);
router.get("/", StudentConrollers.getAllStudent);
// single student get
router.get("/:studenId", StudentConrollers.getSingleStudent);

export const StudentRoutes = router;
