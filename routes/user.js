const router = require('express').Router();
const userController = require('../controllers/user');
const jwtAuthenticator = require('../middleware/jwt-authenticator');


router.post('/register', userController.registration);
router.post('/login', userController.loginByEmail);
router.get('/me', jwtAuthenticator, userController.me);

module.exports = router;
