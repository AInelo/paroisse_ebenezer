const express = require('express');
const router = express.Router();

const { signUp, signIn } = require('../controllers/userController')

router.route('/sign_up').post(signUp)

router.route('/sign_in').post(signIn)

module.exports = router;