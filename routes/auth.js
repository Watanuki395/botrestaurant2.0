
const express = require("express");
const router = express.Router();

const { loginCtrl, registerCtrl, logoutCtrl, forgotpassCtrl} = require('../controllers/auth')

router.get('/',(req,res)=>{
    res.json({
        mensaje: "todo listo"
    })
})

//Login !
router.post('/login', loginCtrl)


//Registrar un usuario
router.post('/register', registerCtrl)

// Salir de la sesion
router.post('/logout', logoutCtrl)

// Recuperar contraseña
router.post('/forgotpass', forgotpassCtrl)


module.exports = router;

