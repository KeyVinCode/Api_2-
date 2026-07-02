import express  from 'express'
const router = express.Router()
import {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    register
} from '../Controllers/user.controller.js'
import userController from "../Controllers/user.controller.js"; // Correcto

router.get('/',getUser)
router.post('/',createUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
router.post('/register', register);
router.post('/login', login);

export default router