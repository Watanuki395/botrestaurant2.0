const express = require('express')
const router = express.Router()
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const { getUser, updateUser, deleteUser } = require('../controllers/users')




router.get('/:id', checkAuth, getUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)





module.exports = router