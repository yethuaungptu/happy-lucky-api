const validator = require('../middleware/request.body.validator');
const schemas = require('../schemas/login.schema');

exports.login = (req, res, next) => {
    const message = validator(schemas.login, req.body);
    message == null ? next() : res.status(422).json({ status: 'fail', message: message });
};

exports.userLogin = (req, res, next) => {
    const message = validator(schemas.userLogin, req.body);
    message == null ? next() : res.status(422).json({ status: 'fail', message: message });
};

exports.adminLogin = (req, res, next) => {
    const message = validator(schemas.adminLogin, req.body);
    message == null ? next() : res.status(422).json({ status: 'fail', message: message });
};
