const { httpError } = require('../helpers/handleError')
var db = require("../models");


const getUser = (req, res) => {
    db.User.findOne({
        where: {id: req.params.id}
    }).then(function(data){
        res.json(data);
    })
}

const updateUser = async (req, res) => {
    try {
        const { name, email, business_nm, admin } = req.body
        const userID = req.params.id ? req.params.id : null
        const unique = await db.User.findOne({
            where: {id: userID}
        })
        if(unique){
            await db.User.update({
                name,
                email,
                business_nm,
                admin
            },
            {
            where:{
                id: req.params.id},
            returning: true
        }).then( (result) => {
            res.json(result[1][0].dataValues)
        })
        }
    } catch (e) {
        httpError(res, e)
    }
}

const deleteUser = async (req, res) => {
    await db.User.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({
        mensaje: `se elimino el usuario con el ID ${req.params.id}`
    })
}

module.exports = { getUser, 
                    deleteUser, 
                    updateUser}