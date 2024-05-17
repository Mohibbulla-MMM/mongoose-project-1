import { Schema, model, connect } from "mongoose";
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from "./student.interface";

// user name schema
const userNameSchema = new Schema<UserName>({
  fristName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// guardian schema
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

// local guardian schema
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

// student schema
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  email: { type: String, required: true },
  gender: ["male", "female", "others"],
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  bloodGroup: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  permanentAddress: { type: String },
  presentAddress: { type: String, required: true },
  profileImage: { type: String },
  isActive: ["active", "inActive"],
});

// student model
const StudentMolel = model<Student>("Student", studentSchema);

export { StudentMolel };
