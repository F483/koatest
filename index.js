const express = require('express');
const bodyParser = require('body-parser');

const mathRoutes = require('./api/math/routes');
const userRoutes = require('./api/user/routes');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use('/api/math', mathRoutes);
app.use('/api/user', userRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
