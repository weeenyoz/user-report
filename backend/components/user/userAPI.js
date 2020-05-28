const express = require('express');

const router = express.Router();

const { signUp, login } = require('./userController');

router.route('/signup').post(signUp);
router.route('/login').post(login);

module.exports.userRoutes = router;
