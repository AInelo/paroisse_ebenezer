const User = require('../models/User');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require ('../errors/custom-error')



const signUp = asyncWrapper(async (req, res) => {
    const { name, email, phno, password } = req.body;

    const newUser = new User({
        name,
        email,
        phno,
        password
    });

    await newUser.save();
    console.log('Record Inserted Successfully');
    res.redirect('signup_success.html');
});