const jwt = require('jsonwebtoken');
const cookie = require('cookie');

module.exports = function (req, res, next) {
    try {
        const token = cookie.parse(req.headers.cookie).JWT_COOKIE_USER;
        const decode = jwt.verify(token, 'Wedding@InviteUser2022');
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Auth failed, Please login user account'
        });
    }
};
