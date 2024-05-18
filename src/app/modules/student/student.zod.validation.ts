import { z } from "zod";

// UserName schema
const userNameZodSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters long." })
    .max(20, { message: "First name can be up to 20 characters long." })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: "First letter of first name must be uppercase.",
      }
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty({ message: "Last name is required." })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Last name must contain only letters.",
    }),
});

// Guardian Zodschema
const guardianZodSchema = z.object({
  fatherName: z.string().nonempty({ message: "Father's name is required." }),
  fatherContactNo: z
    .string()
    .nonempty({ message: "Father's contact number is required." }),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father's occupation is required." }),
  motherName: z.string().nonempty({ message: "Mother's name is required." }),
  motherContactNo: z
    .string()
    .nonempty({ message: "Mother's contact number is required." }),
  motherOccupation: z
    .string()
    .nonempty({ message: "Mother's occupation is required." }),
});

// LocalGuardian Zodschema
const localGuardianZodSchema = z.object({
  name: z.string().nonempty({ message: "Local guardian's name is required." }),
  occupation: z
    .string()
    .nonempty({ message: "Local guardian's occupation is required." }),
  contactNo: z
    .string()
    .nonempty({ message: "Local guardian's contact number is required." }),
  address: z
    .string()
    .nonempty({ message: "Local guardian's address is required." }),
});

// Student schema
const studentZodSchema = z.object({
  id: z.string().nonempty({ message: "Student ID is required." }),
  name: userNameZodSchema,
  email: z
    .string()
    .nonempty({ message: "Email is required." })
    .email({ message: "Invalid email format." }),
  gender: z.enum(["male", "female", "others"], {
    errorMap: () => ({
      message: "Gender must be one of 'male', 'female', or 'others'.",
    }),
  }),
  contactNo: z.string().nonempty({ message: "Contact number is required." }),
  emergencyContactNo: z
    .string()
    .nonempty({ message: "Emergency contact number is required." }),
  dateOfBirth: z.string().nonempty({ message: "Date of birth is required." }),
  bloodGroup: z.enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"], {
    errorMap: (issue) => ({
      message: `${issue.path[0]} is not a valid blood group.`,
    }),
  }),
  guardian: guardianZodSchema,
  localGuardian: localGuardianZodSchema,
  permanentAddress: z.string().optional(),
  presentAddress: z
    .string()
    .nonempty({ message: "Present address is required." }),
  profileImage: z.string().optional(),
  isActive: z
    .enum(["active", "inActive"], {
      errorMap: () => ({
        message: "Status must be either 'active' or 'inActive'.",
      }),
    })
    .default("active"),
});

export { studentZodSchema };
