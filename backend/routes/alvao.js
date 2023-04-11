const express = require('express');
const router = express.Router();
let db = require("../config/alvaoDb.js");


router.get("/testalvao", (req, res) =>{
    db.query(`select *
    from tblNode n
    join vPropertyKind_Model m on n.intNodeId = m.lintNodeId
    where n.txtname like '%zebra%' and n.txtpath like '%5, Ústí nad Orlicí%' and n.lintIconId = 29`
    , (err, data) => {
        if(err) return console.log(err);
        res.status(200).json(data)
    })
});

module.exports = router