import { Request, Response } from "express";
import { StudentServices } from "./student.services";
import studentValidationSchema from "./student.joi.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    // -------- joi validation
    const { error, value } = studentValidationSchema.validate(student);
    if (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong !",
        error: error.details,
      });
      return;
    }
    console.log({ error }, { value });
    // ----------- Zod validation ----------

    // send data to mongodb
    const result = await StudentServices.createStudentInToDB(value);
    res.status(200).json({
      success: true,
      message: "Student is create success!",
      data: result,
    });
  } catch (err) {
    console.log(`student controller error :>- ${err}`);
    res.status(500).json({
      success: false,
      message: "Student is create faild",
      error: err,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentInToDB();
    res.status(200).json({
      success: true,
      message: "All student get seuccess",
      data: result,
    });
  } catch (err) {
    console.log(`All student get error :>- ${err}`);
  }
};

//  get single student
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.studenId;
    console.log(id);
    const result = await StudentServices.getSingleStudenFromDB(id);

    res.status(200).json({
      success: true,
      message: "Single student resive success!",
      data: result,
    });
  } catch (err) {
    console.log(`Sinle studetn get error :>-  ${err}`);
  }
};

export const StudentConrollers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
