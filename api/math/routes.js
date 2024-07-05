const express = require('express');

const router = express.Router();

router.post('/add', (req, res) => {
    const { num1, num2 } = req.body;
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        const result = num1 + num2;
        res.json({ result });
    } else {
        res.status(400).json({ error: 'Invalid input, both num1 and num2 should be numbers.' });
    }
});

module.exports = router;
