const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

exports.checkAdmin = async (req, res) => {
    const data = await Admin.findOne({ username: req.body.username });
    return data;
};

exports.checkUser = async (req, res) => {
    const data = await User.findOne({ username: req.body.username });
    return data;
};

exports.adminLogin = async (req, res, data) => {
    if (data != null && Admin.compare(req.body.password, data.password)) {
        const accessToken = jwt.sign({ id: data._id, name: data.username }, 'Happy@Lucky2022', {
            expiresIn: '3h'
        });
        console.log(accessToken);
        res.setHeader('Set-Cookie', [cookie.serialize('JWT_COOKIE_ADMIN', accessToken, { path: '/' })]);
        return true;
    } else {
        return { status: false };
    }
};

exports.userLogin = async (req, res, data) => {
    if (data != null && User.compare(req.body.password, data.password)) {
        const token = jwt.sign({ id: data._id, name: data.username }, 'Happy@Lucky2022', {
            expiresIn: '3h'
        });
        res.setHeader('Set-Cookie', [cookie.serialize('JWT_COOKIE_USER', token, { path: '/' })]);
        if (data.requested == false) {
            const request_user = await User.findByIdAndUpdate(data._id, {
                $set: {
                    device_id: req.body.device_id,
                    device_name: req.body.device_name,
                    requested: true
                }
            });
            return { status: true, message: 'Request success', data: { result: 'requested' } };
        } else {
            if (data.active == true && data.device_id == req.body.device_id) {
                return { status: true, message: 'Login success', data: { result: 'success' } };
            } else {
                if (data.device_id != req.body.device_id) {
                    return { status: true, message: 'device id not match', data: { result: 'incorrect' } };
                } else {
                    return { status: true, message: 'Wait form admin confirm', data: { result: 'pending' } };
                }
            }
        }
        return true;
    } else {
        return false;
    }
};
