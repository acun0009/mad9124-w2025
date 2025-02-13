const data = require('../models/users.json');

// GET: gets ALL users
const getAll = (_req, res) => {
    res.status(200).json({ data });
}

// POST: add a user
const upload = (req, res) => {
    const {
        name,
        email
    } = req.body;

    const newUser = {
        id: crypto.randomUUID(),
        name,
        email
    }

    data.users.push(newUser);

    res.status(201).json({
        data: newUser,
    });
}

module.exports = {
    getAll, upload
}