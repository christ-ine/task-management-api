import asyncHandler from 'express-async-handler'
import Task from '../models/taskModel.js'
import User from '../models/userModel.js'

const createTask = asyncHandler(async (req, res) => {
    const { title, content } = req.body
    const user = await User.findById(req.params.id)

    
        const task = await Task.create({
            title,
            content,
            user: req.params.id
            
        })

        user.tasks.push(task)
    
        await user.save()
        res.status(201).json({ message: 'Task Created'})
    
})

const updateTask = asyncHandler(async (req, res) => {
    const { title, content } = req.body
    const task = await Task.findById(req.params.id)


        if(task) {
            task.title = title
            task.content = content

            const updatedTask = await task.save()
            res.json(updatedTask)
        } else {
            res.status(404)
            throw new Error('Task not found')
        }
    
})



export { createTask, updateTask }