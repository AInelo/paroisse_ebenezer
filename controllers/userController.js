const User = require('../models/User');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');
const bcrypt = require('bcrypt');
const session = require('express-session');

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

// const signUp = asyncWrapper(async (req, res) => {
//     try {
//         const user = await User.create(req.body);
//         console.log('Utilisateur créé :', user);
//         res.status(201).json({ user });
//     } catch (error) {
//         console.error('Erreur lors de la création de l\'utilisateur :', error);
//         res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
//     }
// });




const signUpi = asyncWrapper(async (req, res) => {
    try {
        console.log('Contenu de req.body :', req.body);
        // Créez un nouvel utilisateur à partir des champs requis de req.body
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        
        console.log('Utilisateur créé :', user);
        res.status(201).json({ user });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
});



const signUpe = asyncWrapper(async (req, res) => {
    try {
        // Affichez le contenu de req.body dans la console
        console.log('Contenu de req.body :', req.body);

        // Créez un nouvel utilisateur à partir des champs requis de req.body
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        
        console.log('Utilisateur créé :', user);
        res.status(201).json({ user });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
});


































const signUp = asyncWrapper(async (req, res) => {
    try {
        const { username, password, email } = req.body;

        console.log('Contenu de req.body :', req.body);

        if (!password) {
            return res.status(400).json({ error: 'Veuillez fournir un mot de passe.' });
        }

        // Hash du mot de passe avec bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur avec le mot de passe haché
        const user = await User.create({ username, password: hashedPassword, email });

        console.log('Utilisateur créé :', user);
        
       // res.status(status).json(obj)

        // res.status(201).json({ user }, () => {
        //     // Cette partie du code sera exécutée après l'envoi de la réponse JSON
        //     res.redirect('auth.html');
        // });

        //res.status(201).json({ user });
        res.redirect('/auth.html');
        // return;
    } catch (error) {
        if (error.code === 11000) {
            console.error('Erreur E11000 : La clé est en double. L\'utilisateur existe déjà.');
            res.status(409).json({ error: 'L\'utilisateur avec cet email existe déjà.' });
        } else {
            console.error('Une erreur s\'est produite lors de la création de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
        }
    }

    
});

const signIn = asyncWrapper(async (req, res) => {
    try {
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
        // Authentification réussie
        req.session.authenticated = true;
        console.log('Authentification réussie. Authenticated:', req.session.authenticated);

        //res.status(200).json({ username: existingUser.username });

        res.redirect('/updatemember.html');
        
        // Vous pouvez également envisager de générer un token JWT ici pour l'authentification
    } catch (error) {
        if (error.code === 11000) {
            console.error('Erreur E11000 : La clé est en double. L\'utilisateur existe déjà.');
            res.status(401).json({ msg: 'Nom d\'utilisateur déjà utilisé. Veuillez choisir un autre.' });
        } else {
            console.error('Une erreur s\'est produite lors de la connexion :', error);
            res.status(500).json({ error: 'Erreur lors de la connexion' });
        }
    }


        // Cette partie du code sera exécutée après l'envoi de la réponse JSON
        //res.redirect('updatemember.html');

});


module.exports = { signUp, signIn };
