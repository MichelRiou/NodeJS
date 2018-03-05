// Import de la bibliothèque Express
const express = require('express');

// Instanciation d'Express
const app = express();

// Gestion des ressources statiques
app.use(express.static(__dirname + '/public'));

// Gestion du moteur de rendu
app.set('views', __dirname + 'views');
app.set ('view engine','pug');

app.get("/hello", (req, res) => {

    // Parametres 
    if (!req.query.name) {
        req.query.name = "inconnu";
    }

    res.end("hello  " + req.query.name);
});


app.get("/hello/:name", (req, res) => {
    let name = req.params.name;
    let message = `Hello ${name}`;   // backtick
    res.end(message);
});

// Express sur le port 3000
app.listen(3000);


