const cors = require('cors');
const jwt = require('jsonwebtoken');

const corsOptions = {
    origin: 'http://localhost:3000', // Altere para o domínio do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = {
    corsOptions,
    authenticateToken,
};