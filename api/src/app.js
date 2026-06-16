const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const cellphonesRoutes = require('./routes/cellphones');
const { corsOptions } = require('./middlewares/corsAndAuth');

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/cellphones', cellphonesRoutes);

module.exports = app;   