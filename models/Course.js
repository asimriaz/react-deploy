import mongoose from "mongoose"

const courseSchema = mongoose.Schema({
	courseid: Number,
	code: String,
	title: String,
	crhr: Number,
	semester: Number
});

export const Course = mongoose.model('course', courseSchema);
