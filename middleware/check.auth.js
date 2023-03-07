const jwt = require('jsonwebtoken');
const cookie = require('cookie');

module.exports = function async(req, res, next) {
    try {
        const token = cookie.parse(req.headers.cookie).JWT_COOKIE_ADMIN;
        const decode = jwt.verify(token, 'Happy@Lucky2022');
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Auth failed, please login admin account'
        });
    }
};
