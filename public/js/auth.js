const formDOM = document.getElementById('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
        await axios.post('/users/signin', {username, password})
    }catch (error) {
        if (error.code === 11000) {
            console.error('Erreur E11000 : La clé est en double. L\'utilisateur existe déjà.');
            res.status(401).json({ msg: 'Nom d\'utilisateur déjà utilisé. Veuillez choisir un autre.' });
        } else {
            console.error('Une erreur s\'est produite lors de la connexion :', error);
            res.status(500).json({ error: 'Erreur lors de la connexion' });
        }
    }
})