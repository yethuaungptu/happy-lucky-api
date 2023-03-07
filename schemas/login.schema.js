const Joi = require('joi');

exports.login = Joi.object({
    userId: Joi.string().required(),
    password: Joi.string().required()
});

exports.userLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    device_id: Joi.string().required(),
    device_name: Joi.string().required()
});

exports.adminLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});
