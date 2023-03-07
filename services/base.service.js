const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { invalidIdError, alreadyExistsError, itemNotFoundError, itemCountLimitedError } = require('../errors/db.errors');
const { RES_DATE_AGG_FORMAT } = require('../constants/constants');

exports.checkId = async (id, Model, key) => {
    await this.checkValidObjectId(id, key);
    const document = await Model.findById(id);
    if (!document) {
        throw invalidIdError(key);
    }
};

exports.checkValidObjectId = async (id, key) => {
    if (!mongoose.isValidObjectId(id)) {
        throw invalidIdError(key);
    }
};

exports.getObjectId = async (id, key) => {
    await this.checkValidObjectId(id, key);
    if (id) {
        return new mongoose.Types.ObjectId(id);
    }
};

exports.checkDuplicateField = async (obj, Model) => {
    const document = await Model.findOne(obj);
    if (document) {
        throw alreadyExistsError(Object.values(obj) + ' is duplicated', document);
    } else {
        console.log('not du');
        return false;
    }
};

exports.getDateFormatStage = (dateFields) => {
    const stage = { $addFields: {} };
    dateFields.forEach((d) => {
        stage['$addFields'][d] = {
            $dateToString: { format: RES_DATE_AGG_FORMAT, date: `$${d}` }
        };
    });
    return stage;
};

exports.projectionPipeline = [
    { $addFields: { id: '$_id' } },
    {
        $project: {
            _id: 0,
            __v: 0,
            isDeleted: 0,
            creator: 0,
            updater: 0,
            createdAt: 0,
            updatedAt: 0,
            fileStoragePath: 0
        }
    }
];

exports.filterById = (pipelineStages, obj) => {
    const filters = _.pickBy(obj, (v) => v !== undefined);

    for (key in filters) {
        pipelineStages.push({ $match: { [key]: filters[key] } });
    }
};

exports.getAdmin = (req) => {
    try {
        return jwt.verify(cookie.parse(req.headers.cookie).JWT_COOKIE_ADMIN, 'Wedding@Invite2022');
    } catch (err) {
        return false;
    }
};

exports.getUser = (req) => {
    try {
        return jwt.verify(cookie.parse(req.headers.cookie).JWT_COOKIE_USER, 'Wedding@InviteUser2022');
    } catch {
        return false;
    }
};

exports.badRequest = (res, message) => {
    return res.status(400).json({
        status: 'error',
        message
    });
};

exports.authFail = (res) => {
    res.status(401).json({
        message: 'Auth Fail'
    });
};

exports.checkItemCountLimit = async (obj, Model, count) => {
    const document = await Model.countDocuments(obj);
    if (document < count) {
        return false;
    } else {
        throw itemCountLimitedError("Item's limit is full");
    }
};

exports.checkField = async (obj, Model, msg) => {
    const document = await Model.findOne(obj);
    if (!document) {
        throw itemNotFoundError(msg + Object.values(obj) + ' is not found');
    }
};
