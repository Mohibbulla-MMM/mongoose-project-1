import Joi from "joi";

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(20)
    .regex(/^[A-Z][a-z]*$/, "first letter uppercase")
    .required()
    .messages({
      "string.base": "First name must be a string",
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters long",
      "string.max": "First name must be at most 20 characters long",
      "string.pattern.name": "First letter must be uppercase",
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]+$/, "only letters")
    .required()
    .messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name is required",
      "string.pattern.name": "Last name must contain only letters",
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "string.base": "Father's name must be a string",
    "string.empty": "Father's name is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "string.base": "Father's contact number must be a string",
    "string.empty": "Father's contact number is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "string.base": "Father's occupation must be a string",
    "string.empty": "Father's occupation is required",
  }),
  motherName: Joi.string().required().messages({
    "string.base": "Mother's name must be a string",
    "string.empty": "Mother's name is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "string.base": "Mother's contact number must be a string",
    "string.empty": "Mother's contact number is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "string.base": "Mother's occupation must be a string",
    "string.empty": "Mother's occupation is required",
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Local guardian's name must be a string",
    "string.empty": "Local guardian's name is required",
  }),
  occupation: Joi.string().required().messages({
    "string.base": "Local guardian's occupation must be a string",
    "string.empty": "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.base": "Local guardian's contact number must be a string",
    "string.empty": "Local guardian's contact number is required",
  }),
  address: Joi.string().required().messages({
    "string.base": "Local guardian's address must be a string",
    "string.empty": "Local guardian's address is required",
  }),
});

const studentJoiSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "Student ID must be a string",
    "string.empty": "Student ID is required",
  }),
  name: userNameValidationSchema.required().messages({
    "object.base": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
    "string.empty": "Email is required",
  }),
  gender: Joi.string().valid("male", "female", "others").required().messages({
    "any.only": "Gender must be one of male, female, or others",
    "string.empty": "Gender is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.base": "Contact number must be a string",
    "string.empty": "Contact number is required",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "string.base": "Emergency contact number must be a string",
    "string.empty": "Emergency contact number is required",
  }),
  dateOfBirth: Joi.string().required().messages({
    "string.base": "Date of birth must be a string",
    "string.empty": "Date of birth is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-")
    .messages({
      "any.only": "Blood group must be one of A+, A-, AB+, AB-, B+, B-, O+, O-",
    }),
  guardian: guardianValidationSchema.required().messages({
    "object.base": "Guardian information is required",
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    "object.base": "Local guardian information is required",
  }),
  permanentAddress: Joi.string().optional(),
  presentAddress: Joi.string().required().messages({
    "string.base": "Present address must be a string",
    "string.empty": "Present address is required",
  }),
  profileImage: Joi.string().optional(),
  isActive: Joi.string()
    .valid("active", "inActive")
    .default("active")
    .messages({
      "any.only": "Status must be either 'active' or 'inActive'",
    }),
});

export default studentJoiSchema;
