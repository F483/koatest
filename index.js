const express = require('express');
const bodyParser = require('body-parser');

const mathRoutes = require('./api/math/routes');
const userRoutes = require('./api/user/routes');

const config = require('./config');

const app = express();

app.use(bodyParser.json());

app.use('/api/math', mathRoutes);
app.use('/api/user', userRoutes);

if (!config.jwt_secret) {
    throw new Error("JWT_SECRET env var required!");
}

if (process.env.NODE_ENV !== 'test') {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

module.exports = app;
