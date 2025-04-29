import mongoose from 'mongoose';

import { Course } from "./Course.js"
import { Grade } from "./Grade.js"
import { Registration } from "./Registration.js"
import { Student } from "./Student.js"

(async () => {
	// await mongoose.connect('mongodb://localhost:27017/datasheet');
	await mongoose.connect('mongodb+srv://dbUser:dbUser@cluster0.enbv6.mongodb.net/datasheet')
})()

export const db = {
	Student,
	Course,
	Grade,
	Registration,
};
