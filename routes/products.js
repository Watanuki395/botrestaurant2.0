const express = require('express')
const router = express.Router()
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const {
    getProduct,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/products");




router.get('/product', getProduct)

router.get('/productsbycategory', getProductsByCategory)

router.post('/', createProduct)

router.put('/', updateProduct)

router.delete('/:id', deleteProduct)

// Categories

router.get('/categories/', getCategories)

router.get('/categories/:id', getCategory)

router.post('/categories/', createCategory)

router.put('/categories/', updateCategory)

router.delete('/categories/:id', deleteCategory)




module.exports = router