const { ok, created } = require('./base.controller');
const adminService = require('../services/admin.service');

exports.index = (req, res) => {
    ok(res, 'Done', 'abc');
};

exports.register = async (req, res, next) => {
    const data = await adminService.register(req, res, next);
    created(res, 'Admin created', data);
};
