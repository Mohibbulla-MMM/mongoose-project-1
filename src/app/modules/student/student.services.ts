import { Error } from "mongoose";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

// create student
const createStudentInToDB = async (student: TStudent) => {
  if (await Student.isExistaStudent(student.id)) {
    throw new Error("This user already exists!");
  }

  const result = await Student.create(student);
  // custom student instance
  // const studenInstance = new Student(student);
  //   if (await studenInstance.isStudentExists(student.id)) {
  //     throw new Error("User already exists !");
  //   }
  // const result = await studenInstance.save();

  return result;
};

// get all student
const getAllStudentInToDB = async () => {
  // const result = await Student.aggregate([]);
  const result = await Student.find();
  return result;
};

// get single student
const getSingleStudenFromDB = async (id: string | number) => {
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

// delete Student by id
const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id: id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentInToDB,
  getAllStudentInToDB,
  getSingleStudenFromDB,
  deleteSingleStudentFromDB,
};
