const Joi = require('joi');

exports.register = Joi.object({
    username: Joi.string().required(),
    displayname: Joi.string().required(),
    password: Joi.string().required(),
    code: Joi.string().required()
});
