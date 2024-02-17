const User = require('../models/User');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require ('../errors/custom-error')



const signUp = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;

    const newUser = new User({
        username,
        password
    });

    await newUser.save();
    console.log('Record Inserted Successfully');
    res.redirect('auth.html');
});
