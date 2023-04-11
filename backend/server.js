const express = require('express');
const cors = require('cors');
const app = express();

let db = require("./config/db.js");

const emergency = require("./routes/emergency.js");
//const alvao = require("./routes/alvao.js");

app.use(cors())
app.use(express.json())

app.use("/cesta", emergency);
//app.use("/alvao", alvao);

app.get('/currentday', (req, res) => {
        db.query(`(
            SELECT c.date, u1.jmeno, u1.telefon, z1.nazev, z1.popis ,z1.zkratka
            FROM emergency.calendar c
            join users u1 on u1.id = c.it_hw
            join zodpovednost z1 on z1.zkratka = "hw"
            where c.date = current_date()
            )
            union
            (SELECT c.date, u1.jmeno, u1.telefon, z1.nazev, z1.popis,z1.zkratka
            FROM emergency.calendar c
            join users u1 on u1.id = c.it_sw
            join zodpovednost z1 on z1.zkratka = "sw"
            where c.date = current_date()
            )
            union
            (SELECT c.date, u1.jmeno, u1.telefon, z1.nazev, z1.popis,z1.zkratka
            FROM emergency.calendar c
            join users u1 on u1.id = c.ptu
            join zodpovednost z1 on z1.zkratka = "ptu"
            where c.date = current_date()
            )`
        , (err, data) => {
            if(err) return console.log(err);
            res.status(200).json(data)
        })
});

app.get("/currentmonth/", (req, res) => {
    let month = req.query.month;
    let year = req.query.year;
    db.query(`SELECT c.id, c.date, u1.jmeno as hw_jmeno, u2.jmeno as sw_jmeno
    FROM emergency.calendar c
    left outer join users u1 on u1.id = c.it_hw 
    left outer join users u2 on u2.id = c.it_sw
    where year(c.date) = ? and month(c.date) = ?
    order by c.date;`,
    [ year, month ],
     (err, data) => {
        if(err) return console.log(err);
        res.status(200).json(data)
    })
   
})

app.get("/getallusers", (req, res) => {
    db.query("SELECT jmeno FROM users",
    (err, data) => {
        if(err) throw err;
      res.status(200).json(data);
    })
})

app.put("/editemergencyday", (req, res) => {
    db.query(`update calendar
    set it_hw = (select id from users where jmeno = ?),
    it_sw = (select id from users where jmeno = ?)
    where id = ?`, [req.body.userHw, req.body.userSw, req.body.id], 
        (err, data) => {
            if(err) return console.log(err);
            res.status(200).json(data)
        })
})

app.put("/editEmergencytillendweek", (req,res) => {
    db.query(`update calendar c
    set it_hw = (select id from users where jmeno = ?),
    it_sw = (select id from users where jmeno = ?) 
    where (week(c.date,1) = week(?,1) and c.date >= ?)
        or (c.date= (date_add(date_add(date_add(?, interval  -WEEKDAY(?)-1 day), interval 6 day), interval 2 day)))`,
    
    [req.body.userHw, req.body.userSw, req.body.date, req.body.date, req.body.date, req.body.date],
    (err, data) => {
        if(err) return console.log(err);
        res.status(200).json(data)
    }
    )
})

app.put("/editEmergencywholeweek", (req,res) => {
    db.query(`update calendar c
    set it_hw = (select id from users where jmeno = ?),
    it_sw = (select id from users where jmeno = ?) 
    where week(date_add(c.date, interval -2 day)) = week(date_add(?, interval -2 day))`,
    
    [req.body.userHw, req.body.userSw, req.body.date],
    (err, data) => {
        if(err) return console.log(err);
        res.status(200).json(data)
    }
    )
})

app.put("/fillcalendarmonth", (req,res) => {
    db.query(`call filldates(?,?)`,
    [req.body.startDate, req.body.endDate],
    (err, data) => {
        if(err) return console.log(err);
        res.status(200).json(data)
    }
    )
})

app.use((req, res, next) => {
    res.status(404).send("<h1>Stránka nenalezena</h><br><img src='https://cdn.searchenginejournal.com/wp-content/uploads/2020/08/404-pages-sej-5f3ee7ff4966b-760x400.png'>")
  })

app.listen(3030, () => console.log('Listening on port 3030...'));