import express from 'express'
import { verifyAdmin } from '../middleware/auth'
import { deleteUser, fetchAllUsers, fetchUserById, updateUser } from '../controllers/userController'

const router = express.Router()

router.get('/', verifyAdmin, fetchAllUsers)
router.get('/:id', verifyAdmin, fetchUserById)
router.patch('/:id', verifyAdmin, updateUser)
router.delete('/:id', verifyAdmin, deleteUser)

export default router