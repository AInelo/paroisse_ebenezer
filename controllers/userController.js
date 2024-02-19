const User = require('../models/User');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

// const signUp = asyncWrapper(async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const newUser = new User({
//             username,
//             password
//         });

//         await newUser.save();

//         console.log('Record Inserted Successfully');
//         res.redirect('auth.html');
//     } catch (error) {
//         // Utilisation du Custom Error pour gérer les erreurs
//         if (error.name === 'MongoError' && error.code === 11000) {
//             // Gestion de la violation de l'index unique (doublon de username)
//             const customError = createCustomError('Ce nom d\'utilisateur est déjà pris.', 400);
//             // Vous pouvez également enregistrer plus d'informations dans le Custom Error si nécessaire
//             throw customError;
//         } else {
//             // Gestion d'autres erreurs inattendues
//             const customError = createCustomError('Une erreur s\'est produite lors de l\'inscription.', 500);
//             throw customError;
//         }
//     }
// });


const signUp = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;

    // Vérifier si le nom d'utilisateur existe déjà
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(400).json({ msg: 'Ce nom d\'utilisateur est déjà pris.' });
    }

    try {
        const newUser = new User({
            username,
            password
        });

        await newUser.save();

        console.log('Record Inserted Successfully');
       // res.redirect('auth.html');
    } catch (error) {
        // Gestion d'autres erreurs inattendues
        const customError = createCustomError('Une erreur s\'est produite lors de l\'inscription.', 500);
        throw customError;
    }
});




const signIn = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;

    // Rechercher l'utilisateur par username
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Utilisation de bcrypt pour vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Authentification réussie
    res.redirect('updatemember.html');
});




module.exports = { signUp, signIn };
