const { Router } = require('express');
const router = Router();
const validateUserData = require('../middleware/validateUserData');
const controller = require('../controller/users');

router.use((_req, _res, next) => {
	next();
});

router.get('/', controller.getAll);
router.post('/', validateUserData, (_req, _res, next) => {
    console.log('Adding a user...');
    next();
},
    controller.upload
);

module.exports = router;