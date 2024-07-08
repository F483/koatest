const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  // TODO move usage to auth

const db = require('../../db');
const config = require('../../config');
const auth = require('./auth');

const router = express.Router();

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
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const digest = await bcrypt.hash(password, salt);
        const [id] = await db('users').insert({ name, email, password: digest }).returning('id');
        const token = jwt.sign({ id }, config.jwt_secret, { expiresIn: config.jwt_expire });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error!' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db('users').where({ email }).first();
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { id: user.id }, config.jwt_secret, { expiresIn: config.jwt_expire }
            );
            res.status(200).json({ token });
        } else {
            res.status(400).json({ message: 'Invalid credentials!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error!' });
    }
});

router.get('/profile', auth, async (req, res) => {
    try {
        const { name, email } = req.user;
        res.status(200).json({ name, email });
    } catch (error) {
        res.status(500).json({ message: 'Server error!' });
    }
});

module.exports = router;
