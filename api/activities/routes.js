const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../../db');
const config = require('../../config');

const router = express.Router();

router.get('/list', async (req, res) => {
    // TODO limit and add filter options
    const activities = await db('activities').select('*');
    res.json(activities);
});

module.exports = router;
