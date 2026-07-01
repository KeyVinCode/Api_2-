const express = require('express')
const router = express.Router()
const {
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../Controllers/user.controller')

router.get('/',getUser)
router.post('/',createUser)
router.put('/:id',updateUser)
router.delete('/:id',updateUser)

module.exports = router