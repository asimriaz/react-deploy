import express from 'express'
import { db } from '../models/index.js';
const router = express.Router();

router.get("/students/:regno", async (req, res) => {
    const student = await db.Student.findOne({ regno: req.params.regno });
    const [regs, grades] = await getStudentRegs(req.params.regno);
    res.status(200).json({ student, regs, grades });
});

router.get("/semesters", async (req, res) => {
    const semesters = await db.Course.distinct("semester");
    res.status(200).json(semesters)
});

router.get("/courses/:semno", async (req, res) => {
    const { semno } = req.params
    const course = await db.Course.find({ semester: semno }).sort({ courseid: 1 });
    res.status(200).json(course)
});

router.post("/regs/update", async (req, res) => {
    console.log(`body >`, req.body);

    const UpdatedReg = await db.Registration.findByIdAndUpdate(
        { _id: req.body.regid },
        {
            $set: {
                gradeid: req.body.gradeid
            }
        },
        { new: true })

    res.status(200).json(UpdatedReg);
});

router.post("/regs/add", async (req, res) => {
    console.log(`body >`, req.body);

    let courseids = JSON.parse(req.body.courseids);
    let regs = [];

    for (let courseid of courseids) {
        regs.push(new db.Registration({ courseid, regno: req.body.regno, gradeid: null }));
    }

    db.Registration.insertMany(regs).then(async response => {
        if (response.length !== 0) {
            const [regs, grades] = await getStudentRegs(req.body.regno);
            res.status(200).json(regs);
        }
    });
})

const getStudentRegs = async (regno) => {
    const response = await Promise.all([
        db.Registration.aggregate([
            { $match: { regno: regno } },
            { $lookup: { from: 'courses', localField: 'courseid', foreignField: 'courseid', as: 'course' } }, { $unwind: '$course' },
            { $lookup: { from: 'grades', localField: 'gradeid', foreignField: 'gradeid', as: 'grade' } }, { $unwind: { path: '$grade', preserveNullAndEmptyArrays: true } },
        ]),
        db.Grade.find().sort({ gradeid: 1 })
    ]);

    return response;
}


export default router