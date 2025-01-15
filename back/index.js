const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Bienvenue sur le backend !');
});

app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
