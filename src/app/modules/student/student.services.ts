import { Error } from "mongoose";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentInToDB = async (student: TStudent) => {
  // const result = await StudentModel.create(student);
  const studenInstance = new Student(student);
  if (await studenInstance.isStudentExists(student.id)) {
    throw new Error("User already exists !");
  }
  const result = await studenInstance.save();
  return result;
};
const getAllStudentInToDB = async () => {
  const result = await Student.find();
  return result;
};

// get single student
const getSingleStudenFromDB = async (id: string | number) => {
  const result = await Student.findOne({ id: id });
  return result;
};

export const StudentServices = {
  createStudentInToDB,
  getAllStudentInToDB,
  getSingleStudenFromDB,
};
