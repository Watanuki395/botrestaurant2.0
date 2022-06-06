const jwt = require('jsonwebtoken') //TODO : 😎

const tokenSign = async (user, secret, expTime) => { //TODO: Genera Token
    try {
        return jwt.sign(
            {
                _id: user.id, //TODO: <---
                uuid: user.uuid,
                admin: user.admin,
                email: user.email
            }, 
            secret, //TODO ENV 
            {
                expiresIn: expTime, //TODO tiempo de vida
            }
        );
    } catch (error) {
        return null
    }

}

const verifyToken = async (token, secret) => {
    try {
        return jwt.verify(token, secret)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => { //TODO: Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}



module.exports = { tokenSign, decodeSign, verifyToken }