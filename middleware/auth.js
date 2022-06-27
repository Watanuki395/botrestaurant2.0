const { verifyToken } = require('../helpers/generateToken')

const checkAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
        const token = authHeader.split(' ')[1];
        const tokenData = await verifyToken(token, process.env.JWT_SECRET)
        if (tokenData._id) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'Tu por aqui no pasas!' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
    }

}

module.exports = checkAuth