const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const cellphonesRoutes = require('./routes/cellphones');
const corsAndAuth = require('./middlewares/corsAndAuth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(corsAndAuth);

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/cellphones', cellphonesRoutes);

module.exports = app;