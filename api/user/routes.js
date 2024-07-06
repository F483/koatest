const express = require('express');
const db = require('../../db');
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
    const { name, email, password } = req.body;
    try {
        const user_id = 42;  // FIXME save user
        
        const token = jwt.sign(
            { id: user_id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }  // TODO save in config and set on one week
        );
        res.status(201).json({ token });
    } catch (error) {
        // TODO no catch all, more granular error handeling
        res.status(400).json({ message: 'User registration failed!' });
    }
});

module.exports = router;
