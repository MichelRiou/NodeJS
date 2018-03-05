// Import de la bibliothèque Express
const express = require('express');

// Instanciation d'Express
const app = express();

// Gestion des ressources statiques
app.use(express.static(__dirname + '/public'));

// Gestion du moteur de rendu
app.set('views', __dirname + '/views');
app.set ('view engine','pug');

// Une route simple
app.get("/hello", (req, res) => {

    // Parametres 
    if (!req.query.name) {
        req.query.name = "inconnu";
    }

    res.render("hello" , {
                    message: "hello" + req.query.name,
                    title:"Mon tire",
                    authenticated:   true,
                    isGod: false,
                    userInfo: {name: "joe Admin", roles: ["admin"]},
                    fruits: ['Pomme','Poire','Cerise','Abricot'],
                });
});


app.get("/hello/:name", (req, res) => {
    let name = req.params.name;
    let message = `Hello ${name}`;   // backtick
    res.end(message);
});

// Express sur le port 3000
app.listen(3000);


