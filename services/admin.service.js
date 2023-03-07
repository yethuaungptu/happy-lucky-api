const Admin = require('../models/admin.model');
const { checkDuplicateField, authFail } = require('./base.service');

exports.register = async (req, res, next) => {
    await checkDuplicateField({ username: req.body.username }, Admin);
    const admin = new Admin();
    if (Admin.compare('hl@2023', req.body.code)) {
        admin.username = req.body.username;
        admin.displayname = req.body.displayname;
        admin.password = req.body.password;
        const data = await admin.save();
        return data;
    } else {
        authFail(res);
    }
};
