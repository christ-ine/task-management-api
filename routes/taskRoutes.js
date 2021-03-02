import express from 'express'
const router = express.Router()
import { createTask, updateTask, deleteTask, updateTaskStatus } from '../controllers/taskController.js'

router.route('/').post(createTask)
router
    .route('/:id')
    .put(updateTask)
    .delete(deleteTask)

router.route('/:id/status').put(updateTaskStatus)

export default router