const express = require('express');
const router = express.Router();

const { signUp, signIn } = require('../controllers/userController')

router.route('/S').post(signUp)

router.route('/SignIn').post(signIn)

module.exports = router;