const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth')

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/update', auth, userController.update)

router.get('/me/:id', userController.me);
router.get('/authme', auth, userController.authme);

module.exports = router;