const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    device_id: {
        type: String,
        default: ''
    },
    device_name: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    requested: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
    next();
});

userSchema.statics.compare = function (cleattext, encrypted) {
    return bcrypt.compareSync(cleattext, encrypted);
};

module.exports = new mongoose.model('User', userSchema);
