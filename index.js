const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./api/user/routes');
const activitiesRoutes = require('./api/activities/routes');

const config = require('./config');

const app = express();

app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/activities', activitiesRoutes);

if (!config.jwt_secret) {
    throw new Error("JWT_SECRET env var required!");
}

if (process.env.NODE_ENV !== 'test') {
    app.listen(config.port, () => {
        console.log(`Server running on http://localhost:${config.port}/`);
    });
}

module.exports = app;
