import { Model } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  email: string;
  gender: "male" | "female" | "others";
  dateOfBirth: string;
  //   avater?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress?: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: "active" | "inActive";
  isDeleted: boolean;
};
// ----------------- custom static methods
// export interface IStudentMethods extends Model<TStudent> {
//   isStudentExists(id: string): Promise<TStudent | null>;
// }

export interface IStudentModel extends Model<TStudent> {
  isExistaStudent(id: string): Promise<TStudent | null>;
}
// custom student istance methods
// export type TstudentMethods = {
//   isStudentExists(id: string): Promise<TStudent | null>;
// };

// custom instance methods
// export type TStudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   TStudentModel
// >;
