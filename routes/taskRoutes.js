import express from 'express'
const router = express.Router()
import { createTask, updateTask } from '../controllers/taskController.js'

router.route('/user/:id').post(createTask)
router.route('/:id').put(updateTask)

export default router