const { BadRequestError } = require('../utils/errors');

const validateUserData = (req, _res, next) => {
    const { name, email } = req.body;
    if (!name) {
        throw new BadRequestError('You need a name!');
    }
    if (!email) {
        throw new BadRequestError('You need an email!');
    }
    next();
  };
  
  module.exports = validateUserData;