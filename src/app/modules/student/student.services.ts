import { Student } from "./student.interface";
import { StudentModel } from "./student.model";
 

const createStudentInToDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};
const getAllStudentInToDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// get single student
const getSingleStudenFromDB = async (id: string | number) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};

export const StudentServices = {
  createStudentInToDB,
  getAllStudentInToDB,
  getSingleStudenFromDB,
};
