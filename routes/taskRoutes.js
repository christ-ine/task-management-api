import express from 'express'
const router = express.Router()
import { createTask } from '../controllers/taskController.js'

router.route('/user/:id').post(createTask)


export default router