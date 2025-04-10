const { Router } = require('express');
const studentController = require('../controllers/students');
const validateStudent = require('../middleware/validateStudent');
const router = Router();

router.use((_req, _res, next) => {
	next();
})

router.post('/', validateStudent(true), (_req, _res, next) => {
	console.log('Creating a student.');
	next();
},
	studentController.create
);

router.get('/', studentController.getAll);
router.get('/:id', studentController.getById);
router.put('/:id', validateStudent(true), studentController.replace);
/*
router.put('/api/v2/students/:id', (req, res) => {
	// 1 find the student
	// const id = req.params.id;
	const { id } = req.params;
	const studentIdx = students.findIndex(
		(student) => student.id === parseInt(id, 10)
	);

	// 1a no student - respond 404
	if (studentIdx === -1) {
		res.status(404).json({
			error: `student with id ${id} not found`,
		});
		return;
	}

	// 2 get the new data from the request
	// 3 update the data in memory
	const { firstName, lastName } = req.body;

	if (!firstName || !lastName) {
		res.status(400).json({
			error: 'firstName and lastName required',
		});
	}

	students[studentIdx] = {
		id: parseInt(id, 10),
		firstName,
		lastName,
	};

	// 4 respond accordingly
	res.json({
		data: students[studentIdx],
	});
});
*/
router.patch('/:id', validateStudent(false), studentController.update);
/*
router.patch('/api/v2/students/:id', (req, res) => {
	// 1 find the student
	// const id = req.params.id;
	const { id } = req.params;
	const studentIdx = students.findIndex(
		(student) => student.id === parseInt(id, 10)
	);

	// 1a no student - respond 404
	if (studentIdx === -1) {
		res.status(404).json({
			error: `student with id ${id} not found`,
		});
		return;
	}

	// 2 get the new data from the request
	// 3 update the data in memory
	const { firstName, lastName } = req.body;
	students[studentIdx] = {
		...students[studentIdx],
		...(firstName && { firstName }),
		...(lastName && { lastName }),
	};

	// 4 respond accordingly
	res.json({
		data: students[studentIdx],
	});
}); */
router.delete('/:id', studentController.deleteOne);

module.exports = router;
