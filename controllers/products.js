const { httpError } = require('../helpers/handleError')
var db = require("../models");


const getProduct = async (req, res) => {
    try {
        const {id_prd,id_user,id_cat } = req.query.id_prd ? req.query : null;
        if(id_prd && id_cat && id_user){
            const result = await db.ProductVw.findOne({
                where: {id_prd,
                        id_user,
                        id_cat}
            })
            if(result === null){
                return res.json({
                    msg: 'No logramos encontrar el producto'
                });
            }else{
                return res.json(result)
            }
        }
    } catch (err) {
        httpError(res, err)
    }
}

const getProductsByCategory = async (req, res) => {
    try {
        const { id_user,id_cat } = req.query.id_cat ? req.query : null;
        if(id_cat && id_user){
            const result = await db.ProductVw.findAll({
                where: {id_user,
                        id_cat}
            })
            if(result === null){
                return res.json({
                    msg: 'No logramos encontrar los productos'
                });
            }else{
                return res.json(result)
            }
        }
    } catch (err) {
        httpError(res, err)
    }
}

const createProduct = async (req, res) => {
    try {
        const { name_prd, description_prd, id_cat, id_user,imgURL_prd } = req.body ? req.body : null;

        const unique = await db.Product.findOne({
            where: {name_prd}
        })
        if(!unique){
            const insert = await db.Product.create({
                name_prd, 
                description_prd, 
                id_cat, 
                id_user,
                imgURL_prd
            }).then(function(data){
                let msg = data ? data : {mensaje: 'Error al insertar el producto, intente nuevamente'}
                return res.json(msg);
        })
        }else{
            return res.json({
                msg: `El producto ${name_prd} ya existe, por favor intente agregando un producto diferente o actualizando el que ya existe.`
            });
        }

    } catch (err) {
        httpError(res, err)
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name_prd, description_prd, id_cat, id_user, id_prd, imgURL_prd } = req.body ? req.body : null;

        const unique = await db.Product.findOne({
            where: {id_prd, id_user}
        })
        if(unique){
            await db.Product.update({
                name_prd, 
                description_prd, 
                id_cat,
                imgURL_prd},{
                where: {
                    id_prd, 
                    id_user
                },
                returning: true
                }).then(function(data){
                let result = data ? {msg: 'El producto se actualizo correctamente'} : {msg: 'Error al actualizar el producto, intente nuevamente'}
                res.json(result)
        })
        }else{
            return res.json({
                msg: `El producto ${name_prd} no se pudo actualizar, por favor intente más tarde`
            });
        }

    } catch (err) {
        httpError(res, err)
    }
}

const deleteProduct  = async (req, res) => {
    let condition = req.params.id ? {id_prd: req.params.id} : null;
    let unique = await db.Product.findOne({
            where: condition
        })
    if(unique){
        await db.Product.destroy({
            where: condition
        })
        res.json({
            mensaje: `se elimino el producto ${unique.dataValues.name_prd}`
        })
    }else{
        res.json({
            mensaje: `no pudimos encontrar el producto`
        })
    }
}

const getCategories = async (req, res) => {
    try {
        //const { id_cat } = req.query.id_cat ? req.query : null;
        const result = await db.Categories.findAll()
        if(result !== null){
            return res.json(result);
        }else{
            return res.json({
                msg: 'No logramos encontrar los productos relacionados a esta categoria'
            });
        }
    } catch (err) {
        httpError(res, err)
    }
}

const getCategory = async (req, res) => {
    try {
        let condition = req.params.id ? {id_cat: req.params.id} : null;
        if(condition){
            const result = await db.Categories.findAll({
                where: condition
            })
            if(result !== null && result.length > 0){
                return res.json(result);
            }else{
                return res.json({
                    msg: 'No logramos encontrar los productos relacionados a esta categoria'
                });
            }
        }
    } catch (err) {
        httpError(res, err)
    }
}

const createCategory = async (req, res) => {
    try {
        const { name_cat, description_cat } = req.body ? req.body : null;

        const unique = await db.Categories.findOne({
            where: {name_cat}
        })
        if(!unique){
            await db.Categories.create({
                name_cat, 
                description_cat
            }).then(function(data){
                let msg = data ? data : {mensaje: 'Error al insertar la categoria, intente nuevamente'}
                return res.json(msg);
        })
        }else{
            return res.json({
                msg: `La categoria ${name_cat} ya existe, por favor intente agregando un producto diferente o actualizando el que ya existe.`
            });
        }

    } catch (err) {
        httpError(res, err)
    }
}

const updateCategory = async (req, res) => {
    try {
        const { name_cat, description_cat, id_cat } = req.body ? req.body : null;
        const unique = await db.Categories.findOne({
            where: {id_cat}
        })
        if(unique){
            await db.Categories.update({
                name_cat, 
                description_cat},{
                where: {
                    id_cat
                },
                returning: true
                }).then(function(data){
                let result = data ? {msg: 'La categoria se actualizo correctamente'} : {msg: 'Error al actualizar la categoria, intente nuevamente'}
                res.json(result)
        })
        }else{
            return res.json({
                msg: `La categoria ${name_cat} no se pudo actualizar, por favor intente más tarde`
            });
        }

    } catch (err) {
        httpError(res, err)
    }
}

const deleteCategory  = async (req, res) => {
    let condition = req.params.id ? {id_cat: req.params.id} : null;
    let unique = await db.Categories.findOne({
            where: condition
        })
    if(unique){
        await db.Categories.destroy({
            where: condition
        })
        res.json({
            mensaje: `se elimino la categoria ${unique.dataValues.name_cat}`
        })
    }else{
        res.json({
            mensaje: `no pudimos encontrar la categoria`
        })
    }
}

module.exports = {
    getProduct,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};