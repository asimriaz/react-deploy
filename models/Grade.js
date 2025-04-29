import mongoose from "mongoose"

const gradeSchema = mongoose.Schema({
	gradeid: Number,
	start: Number,
	end: Number,
	grade: String,
	gpa: Number
});

export const Grade = mongoose.model('grade', gradeSchema);
