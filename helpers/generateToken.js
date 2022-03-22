const jwt = require('jsonwebtoken') //TODO : 😎

const tokenSign = async (user, expTime) => { //TODO: Genera Token
    try {
        return jwt.sign(
            {
                _id: user.id, //TODO: <---
                admin: user.admin
            }, //TODO: Payload ! Carga útil
            process.env.JWT_SECRET, //TODO ENV 
            {
                expiresIn: expTime, //TODO tiempo de vida
            }
        );
    } catch (error) {
        return null
    }

}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => { //TODO: Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}



module.exports = { tokenSign, decodeSign, verifyToken }