const validator = require('../middleware/request.body.validator');
const schemas = require('../schemas/user.schema');

exports.add = async (req, res, next) => {
    const message = await validator(schemas.add, req.body);
    message == null ? next() : res.status(422).json({ status: 'fail', message: message });
};

exports.acceptUser = async (req, res, next) => {
    const message = await validator(schemas.acceptUser, req.body);
    message == null ? next() : res.status(422).json({ status: 'fail', message: message });
};
