require('dotenv').config();

if (process.env.NODE_ENV === 'test') {
    // during tests we'll use an in-memory pg implementation
    module.exports = require('./testPool');
} else {
    const { Pool } = require('pg');
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    module.exports = pool;
}