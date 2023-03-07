const Joi = require('joi');

exports.add = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

exports.acceptUser = Joi.object({
    id: Joi.string().required()
});
