const validator = require('../middleware/request.body.validator');
const schemas = require('../schemas/admin.schema');

exports.register = async (req, res, next) => {
    const message = await validator(schemas.register, req.body);
    message == null ? next() : res.status(422).json({ status: 'fail', message: message });
};
