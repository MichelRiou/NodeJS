const express = require("express");
const router = express.Router();

// Route vers formulaire
router.get("/form", (req, res) => {
    res.render("form")
});
router.post("/form", (req, res) => {
    if (req.body.email == "a@a.com" && req.body.password == "123") {
        res.redirect("/hello")
    } else {
        res.send(403, "Probleme");
    }
});

// Une route simple
router.get("/hello", (req, res) => {

    // Parametres 
    if (!req.query.name) {
        req.query.name = "inconnu";
    }

    res.render("hello", {
        message: "hello" + req.query.name,
        title: "Mon tire",
        authenticated: true,
        isGod: false,
        userInfo: { name: "joe Admin", roles: ["admin"] },
        fruits: ['Pomme', 'Poire', 'Cerise', 'Abricot'],
    });
});


router.get("/hello/:name", (req, res) => {
    let name = req.params.name;
    let message = `Hello ${name}`;   // backtick
    res.end(message);
});
module.exports = router;