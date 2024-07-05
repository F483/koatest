const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        const result = num1 + num2;
        res.json({ result });
    } else {
        res.status(400).json({ error: 'Invalid input, both num1 and num2 should be numbers.' });
    }
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
