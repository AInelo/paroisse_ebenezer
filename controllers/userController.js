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

// const signUp = asyncWrapper(async (req, res) => {
//     const user = await User.create(req.body)
//     res.status(201).json({ user })
// })

const signUp = asyncWrapper(async (req, res) => {
    try {
        const user = await User.create(req.body);
        console.log('Utilisateur créé :', user);
        res.status(201).json({ user });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
});



const signIn = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;

    // Recherche de l'utilisateur dans la base de données
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
        return res.status(401).json({ msg: 'Aucun compte ne correspond à ce nom d\'utilisateur.' });
    }

    // Utilisation de bcrypt pour vérifier le mot de passe
    const isValidPassword = await existingUser.comparePassword(password);

    if (!isValidPassword) {
        return res.status(401).json({ msg: 'Mot de passe incorrect.' });
    }

    // Authentification réussie
    res.status(200).json({ username: existingUser.username });
    // Vous pouvez également envisager de générer un token JWT ici pour l'authentification

    // Redirection vers la page d'update (à décommenter si nécessaire)
    // res.redirect('updatemember.html');
});




































































const signIns = asyncWrapper(async (req, res) => {
    const {username, password} = req.body;

    const VerifiedUsername = await User.findOne({username});
    if (!VerifiedUsername) {
        return res.status(401).json({ msg : 'Aucun compte ne match avec ce username' })
    }

    // Utilisation de bcrypt pour vérifier le mot de passe
    const isValidPassword = await User.compare(password, VerifiedUsername.password);

    if (!isValidPassword) {
        return res.status(401).json({ message: 'Mot de passe pas correct' });
    }

    res.status(200).json({ username: req.params,
     })
    // Authentification réussie

    // res.redirect('updatemember.html');


})




const signUppp = asyncWrapper(async (req, res) => {
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
        const customError = createCustomError('Une erreur produite lors de l\'inscription.', 500);
        throw customError;
    }
});




const signInn = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;

    // Rechercher l'utilisateur par username
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: 'username pas dans la base' });
    }

    // Utilisation de bcrypt pour vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ message: 'Mot de passe pas dans la base' });
    }

    // Authentification réussie
    // res.redirect('updatemember.html');
});




module.exports = { signUp, signIn };
