require('mongoose');
const i18n = require('i18n');

exports.handler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (err.message.match(/(unique|duplicate)/gi)) {
        return res.status(409).json({
            status: 'fail',
            message: err.message,
            data: err.data || null
        });
    }
    switch (err.name) {
        case 'INVALID_ID':
        case 'INVALID':
            res.status(400).json({
                status: 'fail',
                // message: i18n.__('%s.invalid', i18n.__(err.message)),
                message: err.message,
                data: null
            });
            break;
        case 'ITEM_COUNT_LIMITED':
            res.status(400).json({
                status: 'fail',
                // message: i18n.__('%s.invalid', i18n.__(err.message)),
                message: err.message,
                data: null
            });
            break;
        case 'ITEM_NOT_FOUND':
            res.status(404).json({
                status: 'fail',
                // message: i18n.__('%s.not.found', i18n.__(err.message)),
                message: err.message,
                data: err.data || null
            });
            break;
        case 'MISSING_FILE':
            res.status(404).json({
                status: 'fail',
                // message: i18n.__('%s.missing', i18n.__(err.message)),
                message: err.message,
                data: null
            });
            break;
        case 'ITEM_ALREADY_EXISTS':
            res.status(409).json({
                status: 'fail',
                // message: i18n.__('%s.already.exists', i18n.__(err.message)),
                message: err.message,
                data: null
            });
            break;
        case 'UNPROCESSABLE':
            res.status(422).json({
                status: 'fail',
                message: err.message,
                data: null
            });
            break;
        case 'UNSUPPORTED_MEDIA_TYPE':
            res.status(415).json({
                status: 'fail',
                message: err.message,
                data: null
            });
            break;
        case 'FAIL_MOVING_FILES':
            res.status(400).json({
                status: 'fail',
                // message: i18n.__('fail.moving.files'),
                message: 'Fail to moving files',
                data: null
            });
            break;
        case 'UNAUTHORIZED':
            res.status(401).json({
                status: 'fail',
                // message: i18n.__('%s.unauthorized', i18n.__(err.message)),
                message: err.message,
                data: null
            });
            break;
        case 'NOT_ACCEPTABLE':
            res.status(406).json({
                status: 'fail',
                // message: i18n.__('%s.not.acceptable', i18n.__(err.message)),
                message: err.message,
                data: null
            });
            break;
        case 'MulterError':
            switch (err.code) {
                case 'LIMIT_FILE_SIZE':
                    res.status(413).json({
                        status: 'fail',
                        // message: i18n.__('file.too.large'),
                        message: 'File too large',
                        data: null
                    });
                    break;
                case 'LIMIT_FILE_COUNT':
                    res.status(400).json({
                        status: 'fail',
                        // message: i18n.__('too.many.files'),
                        message: 'Too many file',
                        data: null
                    });
                    break;
                default:
                    res.status(400).json({
                        status: 'fail',
                        message: err.message,
                        data: null
                    });
                    break;
            }
        default:
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
                data: null
            });
            break;
    }
};
