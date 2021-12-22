const { httpError } = require('../helpers/handleError')
const { encrypt, compare } = require('../helpers/handleBcrypt')
const { tokenSign } = require('../helpers/generateToken')
//const userModel = require('../models/user')
var db = require("../models");

//Login!
const loginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await db.User.findOne({ where: {
            email: email
        } })

        if (!user) {
            res.status(404)
            res.send({ error: 'User not found' })
        }

        const checkPassword = await compare(password, user.password) //Contraseña!

        //JWT 👉
        const tokenSession = await tokenSign(user) //2d2d2d2d2d2d2

        if (checkPassword) { //Contraseña es correcta!
            res.send({
                user,
                tokenSession
            })
            return
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Constraseña Invalida'
            })
            return
        }

    } catch (e) {
        httpError(res, e)
    }
}

// Log Out
const logoutCtrl = async (res, req) => {
    //res.clearCookie("tokenSession");
    req.tokenSession = undefined
    res.json({
        mensaje:"salida con exito"
    });
}

//Registramos usuario!
const registerCtrl = async (req, res) => {
    try {
        //Datos que envias desde el front (postman)
        const { email, password, business_nm, name } = req.body

        const passwordHash = await encrypt(password) //(123456)<--- Encriptando!!

        const unique = await db.User.findOne({ where: {
            email: email
        } })

        if (!unique) {
                const registerUser = await db.User.create({
                email,
                business_nm,
                name,
                password: passwordHash
            },{returning: true}
            )
            res.send({ data: registerUser })
        }else {
            res.status(409)
            res.send({ error: 'El usuario ya existe' })
        }
    } catch (e) {
        httpError(res, e)
    }
}




module.exports = { loginCtrl, registerCtrl, logoutCtrl }