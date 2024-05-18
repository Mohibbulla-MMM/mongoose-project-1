import { Schema, model } from "mongoose";
import validator from "validator";
import {
  IStudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";
import bcrypt from "bcrypt";
import config from "../../config";
// import { IStudentMethods } from "./staticModel/student.static.interface";

// user name schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
    maxlength: [
      20,
      "frist name You can add up to 20 characters.your value {{VALUE}} is  not valid.",
    ],
    minlength: [
      2,
      "frist name You can add minimum to 2 characters. your value {{VALUE}} is  not valid.",
    ],
    validate: {
      validator: function (value: string) {
        const fristLatter = value.charAt(0).toUpperCase();
        const othersLatter = value.slice(1);
        const fullWord = fristLatter + othersLatter;
        return fullWord != value ? false : true;
      },
      message: "{VALUE} is not valid. frist latter to UPPERCASE",
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    validate: {
      validator: (value: string) => {
        return validator.isAlpha(value);
      },
      message: "{VALUE} is not valid. Only use latters, not use number",
    },
  },
});

// guardian schema
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father's name is required"] },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
});

// local guardian schema
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

// student schema
const studentSchema = new Schema<TStudent, IStudentModel>({
  id: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true,
  },
  password: {
    type: String,
    maxlength: 20,
    required: true,
  },
  name: {
    type: userNameSchema,
    required: [true, "Student name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value: string) => {
        return validator.isEmail(value);
      },
      message: "{VALUE} email type is not valid",
    },
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: `The gender field is required. Select one of 'male', 'female', or 'others'`,
    },
    required: [true, "Gender is required"],
  },
  contactNo: { type: String, required: [true, "Contact number is required"] },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency contact number is required"],
  },
  dateOfBirth: { type: String, required: [true, "Date of birth is required"] },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
      message: `{VALUE} is not valid. Please select one of ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]`,
    },
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian information is required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian information is required"],
  },
  permanentAddress: { type: String },
  presentAddress: {
    type: String,
    required: [true, "Present address is required"],
  },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ["active", "inActive"],
      message: "Status must be either 'active' or 'inActive'",
    },
    default: "active",
  },
});

// custom instance methods
// studentSchema.methods.isStudentExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// ------------- custom statics  methods -----------
// const StaticStudentSchema = new Schema<TStudent, IStudentMethods>();
studentSchema.statics.isExistaStudent = async function (id: string) {
  const isExists = await Student.findOne({ id });
  return isExists;
};

// pre save middleware/hooks
studentSchema.pre("save", async function () {
  // console.log({ this: this }, "Pre Data save hoyar ager message");
  // password hash
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
});

// post save  middleware/hook
studentSchema.post("save", function (doc, next) {
  // console.log(this, "Post Data save hoyar pore message", { document });
  // client side a password send hobe na, kintu database a save thakbe
  doc.password = "";
  next();
});

// student model
const Student = model<TStudent, IStudentModel>("Student", studentSchema);

export { Student };
