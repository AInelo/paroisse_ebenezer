const User = require('../models/User');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

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

const signIn = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;

    // Rechercher l'utilisateur par username
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
        // throw createCustomError('Invalid credentials', 401);
    }

    // Authentification réussie
    res.redirect('signin_success.html');
});

module.exports = { signUp, signIn };
