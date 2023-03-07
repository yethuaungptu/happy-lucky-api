const Couple = require('../models/couple.model');
const { alreadyExistsError } = require('../errors/db.errors');

module.exports = async (req, res, next) => {
    const data = await Couple.findOne({ coupleId: req.body.coupleId, _id: { $ne: req.body.id } });
    if (!data) {
        next();
    } else {
        throw alreadyExistsError('Couple id is duplicated', data);
    }
};
