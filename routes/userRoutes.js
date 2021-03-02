import express from 'express'
const router = express.Router()
import { createUser, completedTasks, incompleteTasks, updateTaskFollowing } from '../controllers/userController.js'

router.route('/').post(createUser)
router.route('/:id/completed').get(completedTasks)
router.route('/:id/incomplete').get(incompleteTasks)
router.route('/:id/following').put(updateTaskFollowing)

export default router