const loginService = require('../services/login.service');
const { created, retrieved, updated, deleted, paginatedData } = require('./base.controller');

// exports.login = async (req, res) => {
//     const result = await loginService.login(req);
//     return res.status(200).json(result);
// };

exports.adminLogin = async (req, res) => {
    const admin = await loginService.checkAdmin(req, res);
    const data = await loginService.adminLogin(req, res, admin);
    if (data) return res.status(200).send({ status: 'OK' });
    else
        return res.status(404).json({
            message: 'Username not found or password not match'
        });
};

exports.userLogin = async (req, res) => {
    const user = await loginService.checkUser(req, res);
    const data = await loginService.userLogin(req, res, user);
    if (data.status) return res.status(200).send(data);
    else
        return res.status(404).json({
            message: 'Username not found or password not match'
        });
};
