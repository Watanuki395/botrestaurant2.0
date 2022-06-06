
const express = require("express");
const router = express.Router();

const { loginCtrl, registerCtrl, logoutCtrl, forgotpassCtrl, resetPasswordCtrl, createNewPassCtrl, handleRefreshTokenCtrl} = require('../controllers/auth')

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

// Recuperar contraseña - inicia la peticion
router.post('/forgotpass', forgotpassCtrl)

// ruta nueva contraseña - cuando el cliente accede desde el correo
router.get('/reset-password/:uuid/:token', resetPasswordCtrl)

// Crear nueva contraseña
router.post('/reset-password/:uuid/:token', createNewPassCtrl)

// Refrescamos el token
router.get('/refresh-token', handleRefreshTokenCtrl);

module.exports = router;

