import express from "express";
import { StudentConrollers } from "./student.controller";

const router = express.Router();

// student create/insert
router.post("/create-student", StudentConrollers.createStudent);
// all student get
router.get("/", StudentConrollers.getAllStudent);
// single student get
router.get("/:studenId", StudentConrollers.getSingleStudent);
// single student get
router.delete("/:studenId", StudentConrollers.deleteSingleStudent);

export const StudentRoutes = router;
