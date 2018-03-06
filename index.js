// Import de la bibliothèque Express
const express = require('express');

// Instanciation d'Express
const app = express();

const bodyParser = require("body-parser");

const basicRoutes = require("./routes/basic"); 
const apiRoutes = require("./routes/api");

// Gestion des ressources statiques
app.use(express.static(__dirname + '/public'));

// Gestion du moteur de rendu
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("",basicRoutes);
app.use("/api",apiRoutes);

// Express sur le port 3000
app.listen(3000);
