import mongoose from "mongoose";

const registrationSchema = mongoose.Schema({
	courseid: Number,
	regno: String,
	gradeid: Number
});

export const Registration = mongoose.model('registration', registrationSchema);
