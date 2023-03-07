const { ok, created, updated } = require('./base.controller');
const userService = require('../services/user.service');

exports.index = (req, res) => {
    ok(res, 'Done', 'abc');
};

exports.add = async (req, res, next) => {
    const data = await userService.add(req, res, next);
    created(res, 'User created', data);
};

exports.list = async (req, res, next) => {
    const data = await userService.list(req, res, next);
    ok(res, 'User list', data);
};

exports.requestList = async (req, res, next) => {
    const data = await userService.requestList(req, res, next);
    ok(res, 'Request user list', data);
};

exports.acceptUser = async (req, res, next) => {
    const data = await userService.acceptUser(req, res, next);
    updated(res, 'Request user accepted', data);
};
