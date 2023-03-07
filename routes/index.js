const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const adminValidator = require('../validators/admin.validator');
const loginController = require('../controllers/login.controller');
const loginValidator = require('../validators/login.validator');

router.post('/admin-register', adminValidator.register, adminController.register);
router.post('/admin-login', loginValidator.adminLogin, loginController.adminLogin);
router.post('/user-login', loginValidator.userLogin, loginController.userLogin);

module.exports = router;
