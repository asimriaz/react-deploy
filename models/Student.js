import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
	regno: String,
	studentname: String,
	fathername: String
});

export const Student = mongoose.model('student', studentSchema);
