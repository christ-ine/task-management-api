import express from 'express'
const router = express.Router()
import { createTask, updateTask, deleteTask } from '../controllers/taskController.js'

router.route('/').post(createTask)
router
    .route('/:id')
    .put(updateTask)
    .delete(deleteTask)

export default router