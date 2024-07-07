const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../../db');
const config = require('../../config');

const router = express.Router();

// TODO add bonus Create call
// TODO add bonus Read call
// TODO add bonus Update call
// TODO add bonus Delete call
// TODO add bonus Mark activities as completed
// TODO add bonus List completed activities

router.get('/list', async (req, res) => {
    // TODO limit and add filter options
    const activities = await db('activities').select('*');
    res.json(activities);
});

module.exports = router;
