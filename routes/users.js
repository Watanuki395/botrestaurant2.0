const express = require('express')
const router = express.Router()
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const { getProvider, getAllProviders, createServiceProvider, deleteItem, deleteProvider, updateUser, UpdateProvider } = require('../controllers/users')




//router.get('/:id', checkAuth, getUser)

//TODO: Donde recibimos data


router.put('/:id', updateUser)

router.delete('/:id', deleteItem)


// provider - barbero - masajista - estilista 

router.post('/provider', checkAuth, createServiceProvider)

router.get('/provider/:id', checkAuth, getProvider)

router.get('/allprovider/:id', checkAuth, getAllProviders)

router.delete('/provider/:id', checkAuth, deleteProvider)

router.put('/provider/:id', checkAuth, UpdateProvider)


module.exports = router