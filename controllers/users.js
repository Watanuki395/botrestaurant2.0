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

        const { name, email } = req.body

        await db.User.update({
                name: name,
                email: email
            },
            {
            where:{
                id: req.params.id},
            returning: true
        }).then( (result) => {
            res.json({result})
        })
    } catch (e) {
        httpError(res, e)
    }
}

const deleteItem = async (req, res) => {
    await db.User.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({
        mensaje: `se elimino el usuario con el ID ${req.params.id}`
    })
}


const createServiceProvider = async (req, res) => {
    try {
        const { id_barbershop, name_sp, bio_sp } = req.body
        const resDetail = await db.Srvc_prov.create({
            id_barbershop, name_sp, bio_sp
        })
        res.send({ data: resDetail })
    } catch (e) {
        httpError(res, e)
    }
}

const getAllProviders = async (req, res) => {
    try {
        let condition = req.params.id ? {id_barbershop: req.params.id} : null;
        await db.Srvc_prov.findAll({
            where: condition
        }).then(function(data){
            res.json(data);
        })

    } catch (e) {
        httpError(res, e)
    }
}

const getProvider = async (req, res) => {
    try {
        let condition = req.params.id ? {id: req.params.id} : null;
        await db.Srvc_prov.findOne({
            where: condition
        }).then(function(data){
            res.json(data);
        })

    } catch (e) {
        httpError(res, e)
    }
}

const UpdateProvider = async (req, res) => {
    try {
        const { name_sp, bio_sp } = req.body

        await db.Srvc_prov.update({
            name_sp: name_sp,
            bio_sp: bio_sp
            },
            {
            where:{
                id: req.params.id},
            returning: true
        }).then( (result) => {
            res.json(result)
        })
    } catch (e) {
        httpError(res, e)
    }
}

const deleteProvider = async (req, res) => {
    let condition = req.params.id ? {id: req.params.id} : null;
    let unique = await db.Srvc_prov.findOne({
            where: condition
        })

    if(unique){
        await db.Srvc_prov.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            mensaje: `se elimino el usuario con el ID ${req.params.id}`
        })
    }else{
        res.json({
            mensaje: `no pudimos encontrar el usuario con el ID ${req.params.id}`
        })
    }
}

module.exports = { getUser, 
                    deleteItem, 
                    updateUser, 
                    getAllProviders, 
                    getProvider, 
                    createServiceProvider,
                    UpdateProvider, 
                    deleteProvider}