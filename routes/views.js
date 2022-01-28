const { json } = require("body-parser");
const { request } = require("express");
const express = require("express");
const router = express.Router();



/*
AUTH
*/ 
router.get("/login", async (req, res) => {
    return res.render('login',
    {style: 'login.css',
    message: req.body.message
    });
});

router.get("/forgotpass", async (req, res) => {
    return res.render('forgotpass',
    {style: 'login.css'
    });
});

router.get("/register", async (req, res) => {
    return res.render('register',
    {style: 'register.scss'
    });
});

/*
USER
*/ 
router.get("/dashboard/:id", async (req, res) => {
    return res.render('dashboard',
    {style: 'login.css'
    });
});


/*
Menu
*/ 
router.get("/menu", async (req, res) => {
    return res.render('menu');
});

router.get("/breakfast", async (req, res) => {
    return res.render('breakfast');
});

router.get("/lunch", async (req, res) => {
    return res.render('lunch');
});

router.get("/diner", async (req, res) => {
    return res.render('diner');
});

router.get("/drinks", async (req, res) => {
    return res.render('drinks');
});

router.get("/", async (req, res) => {
    return res.redirect('/views/login')
});

module.exports = router;
