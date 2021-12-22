const { json } = require("body-parser");
const { request } = require("express");
const express = require("express");
const router = express.Router();


/*
AUTH
*/ 
router.get("/login", async (req, res) => {
    return res.render('login',
    {style: 'login.css'
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
    return res.json({hola: 'por favor inicia secion'})
});

module.exports = router;
