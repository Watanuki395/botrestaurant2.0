const { httpError } = require('../helpers/handleError')
const { encrypt, compare } = require('../helpers/handleBcrypt')
const { tokenSign, verifyToken } = require('../helpers/generateToken')
//const userModel = require('../models/user')
var db = require("../models");

//Login!
const loginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await db.User.findOne({ where: {
            email: email
        } })

        if (user) {
            
            const checkPassword = await compare(password, user.password) //Contraseña!

            //JWT 👉
            const tokenSession = await tokenSign(user, "1h") //2d2d2d2d2d2d2

            if (checkPassword) { //Contraseña es correcta!
                res.send({
                    user,
                    tokenSession
                })
                return
            }

            if (!checkPassword) {
                //res.status(409)
                res.send({
                    error: 'Constraseña Invalida'
                })
                return
            }
        }else{
            //res.status(404)
            res.send({ 
                error: 'Usuario y/o contraseña no validos' 
            })
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
        const { email, password, password2, business_nm, name } = req.body

        const passwordHash = await encrypt(password) //(123456)<--- Encriptando!!

        const unique = await db.User.findOne({ where: {
            email: email
        } })

        const matchPass = password === password2 ? true : false

        if (!unique && matchPass) {
                const registerUser = await db.User.create({
                email,
                business_nm,
                name,
                password: passwordHash
            },{returning: true}
            )
            res.send({ data: registerUser })
        }else {
            if(!matchPass){
                res.status(409)
                res.send({ error: 'La contraseña no coincide ' })
            }else{
                res.status(409)
                res.send({ error: 'El usuario ya existe' })
            }
            
        }
    } catch (e) {
        httpError(res, e)
    }
}

const forgotpassCtrl = async(req, res) => {
    try {
        const { email } = req.body

        const user = await db.User.findOne({ where: {
            email: email
        } })

        if (user) {
            const token = await tokenSign(user, "15m")//jwt.sign(payload, secret, {expiresIn: '15m'})
            const link =`http://localhost:8081/api/auth/reset-password/${user.uuid}/${token}`
            console.log(link)
            res.send({msg: 'Enviamos un correo de confirmación' })
            return
        }else{
            //res.status(404)
            res.send({ 
                error: 'No existe un usuario registrado con este correo electronico' 
            })
            return
        }
    } catch (e) {
        httpError(res, e)
    }
}

const resetPasswordCtrl = async(req, res) => {
    try {
        const { uuid, token } = req.params

        const user = await db.User.findOne({ where: {
            uuid
        } })
        const payload = await verifyToken(token)

        if (user && payload) {
            res.status(200)
            res.send({msg: 'link valido'})
            return
        }else{
            //res.status(404)
            res.send({ 
                msg:'Error al validar el link',
                error: 'El link no es valido o el tiempo para resetear tu contraseña a expirado' 
            })
            return
        }
    } catch (e) {
        httpError(res, e)
    }
}

const createNewPassCtrl = async(req, res) => {
    try {
        const { uuid, token } = req.params
        const { password, password2 } = req.body

        const user = await db.User.findOne({ where: {
            uuid
        } })
        const matchPass = password === password2 ? true : false

        const passwordHash = await encrypt(password) //(123456)<--- Encriptando!!

        if (user && matchPass) {
            await db.User.update({
                password: passwordHash
            },
            {
            where:{
                uuid: uuid},
            returning: true
        }).then( (result) => {
            res.json({result})
        })
        }else{
            //res.status(404)
            res.send({ 
                error: 'No se pudo actualizar la contraseña' 
            })
            return
        }
    } catch (e) {
        httpError(res, e)
    }
}
module.exports = { loginCtrl, registerCtrl, logoutCtrl, forgotpassCtrl, resetPasswordCtrl, createNewPassCtrl}