const express = require('express');
const db = require('../../db');
const config = require('../../config');
const jwt = require('jsonwebtoken');

const router = express.Router();

// TODO /login
// TODO /reset/password
// TODO /change/password
// TODO /change/email

router.get('/names', async (req, res) => {
    // TODO limit and add filter options
    const users = await db('users').select('*');
    const names = users.map(obj => obj.name);
    res.json(names);
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body; // TODO validate input
        // FIXME handle name or email already exists
        const [id] = await db('users').insert({ name, email, password }).returning('id');
        const token = jwt.sign(
            { id: id }, 
            process.env.JWT_SECRET, 
            { expiresIn: config.jwt_expire }
        );
        res.status(201).json({ token });
    } catch (error) {
        // TODO no catch all, more granular error handeling
        res.status(400).json({ message: 'User registration failed!' });
    }
});

module.exports = router;
