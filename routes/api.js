const express = require("express");
const router = express.Router();

// Referencement des Middleware
// Securisation avec une cle puis passage au prochain middleware
router.use( (req, res, next) => {
    if (req.query.key != "123") {
        res.send(403, "Accès interdit");
    }else{
        req.keyPassed=true;  // Pour exemple de passage infos entre middleware
        next();
    }  
});

router.get('/list', function (req, res) {
    res.end("list " + req.keyPassed);
});
module.exports= router;