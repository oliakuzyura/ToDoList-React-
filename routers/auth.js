const express = require("express");
const router = express.Router();

const busboyBodyParser = require('busboy-body-parser');
const bodyParser = require('body-parser');
const user = require('../models/user');
const crypto = require('crypto');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');


let isadmin;
router.use(busboyBodyParser());
//router.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(busboyBodyParser({ limit: '5mb' }));
// new middleware
router.use(cookieParser());
router.use(session({
    secret: "Some_secret^string",
    resave: false,
    saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser(function (user, done) {
    // наприклад, зберегти у Cookie сесії id користувача
    done(null, user);
});

// отримує інформацію (id) із Cookie сесії і шукає користувача, що їй відповідає
passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use(new LocalStrategy((username, password, done) => {
    user.getAll()
        .then(users => {
            console.log(users);
            let user1;
            for (let i = 0; i < users.length; i++) {
                if (username == users[i].username && users[i].password == password) {
                    user1 = users[i];
                }
            }
            done(null, user1);

        })
        .catch(err => done(err, null));

}));

router.get('/login', function (req, res) {
    res.render('login');
});
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
  
    res.send(true);
});

router.get('/logout', function (req, res) {
    req.logout();
});

module.exports = router;