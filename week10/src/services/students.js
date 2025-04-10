const students  = require('../models/students.json')

const getAll = () => students;

const create = (firstName, lastName) => {
    // find new student data
		const newStudent = {
			id: Date.now(), // NOTE - this is not ideal, but will do for now
			firstName,
			lastName,
		};
	
		// save new student in our array
		students.push(newStudent);
        return newStudent
}

module.exports = {
    getAll, create
}