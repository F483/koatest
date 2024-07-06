const express = require('express');
const db = require('../../db');

const router = express.Router();

router.get('/names', async (req, res) => {
    // TODO limit and add filter options
    const users = await db('users').select('*');
    const names = users.map(obj => obj.name);
    res.json(names);
});

module.exports = router;
