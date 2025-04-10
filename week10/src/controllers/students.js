const { NotFoundError, BadRequestError } = require('../middleware/errors');
const students = require('../models/students.json');
const studentService = require('../services/students');

// create a new student
const create = (req, res, next) => {
	try {
		const { firstName, lastName } = req.body;
	
		const newStudent = studentService.create(firstName, lastName);
	
		// respond with new student (including it's id)
		res.status(201).json({
			data: newStudent,
		});
	} catch(error) {
		next(error);
	}
}

// return a collection of students
const getAll = (_req, res, next) => {
	try {
		const students = studentService.getAll();
		res.status(200).json({
			data: students,
		});
	} catch(error) {
		next(error);
	}
}

// return the student matching the id value
const getById = (req, res, next) => {
	try {

		const studentId = req.params.id;
		const student = students.find((s) => s.id === parseInt(studentId, 10));
	
		if (!student) {
			throw new NotFoundError(`student with ${id} not found`);
		}
	
		res.json({
			data: student,
		});
	} catch(error) {
		next(error)
	}
}

// replace all properties of a student
const replace = (req, res, next) => {
	try {

		// 1 find the student
		// const id = req.params.id;
		const { id } = req.params;
		const foundStudent = students.find(
			(student) => student.id === parseInt(id, 10)
		);
	
		// 1a no student - respond 404
		if (!foundStudent) {
			throw new NotFoundError(`student with ${id} not found`);
		}
	
		// 2 get the new data from the request
		// 3 update the data in memory
		const { firstName, lastName } = req.body;
	
		if (!firstName || !lastName) {
			throw new BadRequestError(`firstName and lastName required`)
		}
	
		foundStudent.firstName = firstName;
		foundStudent.lastName = lastName;
	
		// 4 respond accordingly
		res.json({
			data: foundStudent,
		});
	} catch(error) {
		next(error);
	}
}

// update some properties of a student
const update = (req, res, next) => {
	try {
		const studentId = parseInt(req.params.id, 10);
	
		const foundStudent = students.find((student) => student.id === studentId);
	
		if (!foundStudent) {
			throw new NotFoundError(`student with id ${studentId} not found`)
		}
	
		// for (const key of ['firstName', 'lastName']) {
		//   if (req.body[key]) foundStudent[key] = req.body[key];
		// }
	
		res.json({
			data: foundStudent,
		});
	} catch(error) {
		next(error);
	}
}

// destroy the record for a student
const deleteOne = (req, res, next) => {
	try {
		const studentId = parseInt(req.params.id);
	
		const studentIdx = students.findIndex(({ id }) => id === studentId);
	
		if (studentIdx < 0) {
			throw new NotFoundError(`student with ${id} not found`);
		}
		// const deletedStudent = students[studentIdx];
		const [deletedStudent] = students.splice(studentIdx, 1);
	
		res.json({
			data: deletedStudent,
		});
	} catch(error) {
		next(error);
	}
}

module.exports = {
    create, getAll, getById, replace, update, deleteOne
}