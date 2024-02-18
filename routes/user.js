const express = require('express');
const router = express.Router();

const { SignUp, SignIn } = require('../controllers/userController')

router.route('/SignUp').post(SignUp)

router.route('/SignIn').post(SignIn)

module.exports = router;