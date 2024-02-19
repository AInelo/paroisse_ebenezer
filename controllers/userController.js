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


const signUpr = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({
            username,
            password
        });

        await newUser.save();

        console.log('Record Inserted Successfully');
        res.redirect('auth.html');
    } catch (error) {
        // Utilisation du Custom Error pour gérer les erreurs
        if (error.name === 'MongoError' && error.code === 11000) {
            // Gestion de la violation de l'index unique (doublon de username)
            const customError = createCustomError('Ce nom d\'utilisateur est déjà pris.', 400);
            // Vous pouvez également enregistrer plus d'informations dans le Custom Error si nécessaire
            throw customError;
        } else {
            // Gestion d'autres erreurs inattendues
            const customError = createCustomError('Une erreur s\'est produite lors de l\'inscription.', 500);
            throw customError;
        }
    }
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
    res.redirect('updatemember.html');
});

module.exports = { signUp, signIn };
