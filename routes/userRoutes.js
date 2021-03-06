import express from 'express'
const router = express.Router()
import { createUser, completedTasks, incompleteTasks, updateTaskFollowing, followingList, deleteUser } from '../controllers/userController.js'

router.route('/').post(createUser)
router.route('/:id/completed').get(completedTasks)
router.route('/:id/incomplete').get(incompleteTasks)
router.route('/:taskId/follow').put(updateTaskFollowing)
router.route('/:id/followlist').get(followingList)
router.route('/:id/deleteuser').delete(deleteUser)

export default router