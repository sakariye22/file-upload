require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET 
const tokenBlacklist = new Set();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (token == null) return res.sendStatus(401);
    if (tokenBlacklist.has(token)) return res.sendStatus(401); 

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) return res.sendStatus(403);
        req.user = payload; 
        next();
    });
};

module.exports = { authenticateToken, tokenBlacklist };
