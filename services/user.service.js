const User = require('../models/user.model');
const { checkDuplicateField } = require('./base.service');

exports.add = async (req, res, next) => {
    await checkDuplicateField({ username: req.body.username }, User);
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    const data = await user.save();
    return data;
};

exports.list = async (req, res, next) => {
    const data = await User.find();
    return data;
};

exports.requestList = async (req, res, next) => {
    const data = await User.find({ requested: true, active: false });
    return data;
};

exports.acceptUser = async (req, res, next) => {
    const acceptUser = await User.findByIdAndUpdate(req.body.id, { $set: { active: true } });
    return acceptUser;
};
