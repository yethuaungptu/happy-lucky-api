const router = require('express').Router();
const checkAuth = require('../middleware/check.auth');
const userController = require('../controllers/user.controller');
const userValidator = require('../validators/user.validator');

router.post('/user-add', checkAuth, userValidator.add, userController.add);
router.get('/user-list', checkAuth, userController.list);
router.get('/request-user-list', checkAuth, userController.requestList);
router.post('/accept-user', checkAuth, userValidator.acceptUser, userController.acceptUser);
module.exports = router;
