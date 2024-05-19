import { studentSchema } from "../student.model";

studentSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  console.log(this);
  next();
});

studentSchema.pre("findOne", async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  console.log(this);
  next();
});
