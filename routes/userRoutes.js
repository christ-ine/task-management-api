import express from 'express'
const router = express.Router()
import { createUser, completedTasks, incompleteTasks } from '../controllers/userController.js'

router.route('/').post(createUser)
router.route('/:id/completed').get(completedTasks)
router.route('/:id/incomplete').get(incompleteTasks)

export default router