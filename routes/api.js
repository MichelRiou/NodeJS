const express = require("express");
const router = express.Router();
const fs = require("fs");
const todoFile = "data/todo.json";
const db = require("/modules/db");

// Gestion des CORS
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Referencement des Middleware
// Securisation avec une cle puis passage au prochain middleware
router.use((req, res, next) => {
    if (req.query.key != "123") {
        res.send(403, "Accès interdit");
    } else {
        req.keyPassed = true;  // Pour exemple de passage infos entre middleware
        next();
    }
});
// Lecture de la list des todo
router.use((req, res, next) => {
    fs.readFile("data/todo.json", (err, data) => {
        if (err) {
            console.log(err);
            res.send(500, "Erreur");
        } else {
            req.todoList = JSON.parse(data);
            next();
        }
    })

});
router.get('/list', function (req, res) {
    // Lecture du fichier et retourner le contenu du fichier avec res.json();

    res.json(req.todoList);
    //res.end("list " + req.keyPassed);
});
// Création d'une fonction
let persist = (data, res, callback) => {
    fs.writeFile(todoFile, JSON.stringify(data), (err) => {
        if (err) {
            res.send(500, "Erreur");
        } else {
            callback();
        }
    })
}
// Suppression 
router.get("/delete/:pos", (req, res) => {
    req.todoList.splice(req.params.pos, 1);
    persist(req.todoList, res, () => {
        res.json(req.todoList)
    })

});
// Ajout Requete en POST  grace a bodyParser
router.post("/add", (req, res) => {
    let newtask = {
        task: req.body.task,
        done: (req.body.done == "true")
    }
    req.todoList.push(newtask);
    persist(req.todoList, res, () => {
        res.json(req.todoList)
    })
})

// Modif Requete en POST  grace a bodyParser
router.post("/modif/:pos", (req, res) => {

    let task = req.todoList[req.params.pos];
    console.log(task);
    task.task = req.body.task;
    task.done = req.body.done == "true";
    persist(req.todoList, res, () => {
        res.json(req.todoList)

    })
})
router.get("/posts/list",(req,res)=>{
    db.query("SELECT * FROM authors",(err,rows)=>{
        if(err){
            res.send(500,'erreur');
        }else{
            res.json(rows);
        }
    })
})
module.exports = router;