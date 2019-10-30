const express = require("express");
const app = express();
const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.listen(8000, () => console.log("listening on port 8000"));

app.get('/', (req, res) => {
    if (req.session.counter) {
        req.session.counter = req.session.counter + 1;
    } else {
        req.session.counter = 1;
    }
    console.log("root " + req.session.counter);
    res.render("index", { count: req.session.counter });
});

app.get('/add', (req, res) => {
    console.log("before " + req.session.counter);
    req.session.counter = req.session.counter + 1;
    console.log("after " + req.session.counter);
    res.redirect('/');
});

app.get('/reset', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})