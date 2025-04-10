const { UnauthorizedError } = require("./errors");
const tokenService = require('../services/token');

const isAuthenticated = (req, res, next) => {
    // Authorization: Bearer [token]

    const rawToken = req.headers.authorization;
    if(!rawToken) throw new UnauthorizedError('Unauthorized');
    const token = rawToken.replace('Bearer ', '');

    const user = tokenService.verify(token);
    req.user = user;
    next();
}

module.exports = isAuthenticated;