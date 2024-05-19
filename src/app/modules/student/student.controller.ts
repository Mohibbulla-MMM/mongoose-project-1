import { Request, Response } from "express";
import { StudentServices } from "./student.services";
import { studentZodSchema } from "./student.zod.validation";

// create student --------------
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;
    // --------  Zod validation -------------
    const studetnZodValidation = studentZodSchema.parse(student);
    // send data to mongodb
    const result =
      await StudentServices.createStudentInToDB(studetnZodValidation);
    // send result client site
    res.status(200).json({
      success: true,
      message: "Student is create success!",
      data: result,
    });
  } catch (err: any) {
    console.log(`student controller error :>- ${err}`);
    res.status(500).json({
      success: false,
      message: err.message || "Student is create faild",
      error: err,
    });
  }
};

// get/find all student --------------
const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentInToDB();
    res.status(200).json({
      success: true,
      message: "All student get seuccess",
      data: result,
    });
  } catch (err: any) {
    console.log(`All student get error :>- ${err}`);
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong !",
      data: err,
    });
  }
};

//  get/find single student by id
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.studenId;
    console.log(id);
    const result = await StudentServices.getSingleStudenFromDB(id);
    // client site send reslt
    res.status(200).json({
      success: true,
      message: "Single student resive success!",
      data: result,
    });
  } catch (err: any) {
    console.log(`Sinle studetn get error :>-  ${err}`);
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong !",
      data: err,
    });
  }
};

// delete singel student by id
const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studenId } = req.params;
    console.log(studenId)
    const result = await StudentServices.deleteSingleStudentFromDB(studenId);
    res.status(200).json({
      success: true,
      message: "Deleted success !",
      data: result,
    });
  } catch (err: any) {
    console.log(`delete single student err :>- ${err}`);
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

export const StudentConrollers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
};
