import { Student } from "./student.interface";
import { StudentMolel } from "./student.model";

const createStudentInToDB = async (student: Student) => {
  const result = await StudentMolel.create(student);
  return result;
};
const getAllStudentInToDB = async () => {
  const result = await StudentMolel.find();
  return result;
};

// get single student
const getSingleStudenFromDB = async (id: string | number) => {
  const result = await StudentMolel.findOne({ id: id });
  return result;
};

export const StudentServices = {
  createStudentInToDB,
  getAllStudentInToDB,
  getSingleStudenFromDB,
};
