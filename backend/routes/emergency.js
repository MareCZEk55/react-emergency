const express = require('express');
const router = express.Router();

let db = require("../config/db.js");

router.get('/test', (req, res) => {
    db.query("select * from users", function(err, data, fields){
        if(err) return err;
        res.status(200).json(data);
    });
});

module.exports = router;