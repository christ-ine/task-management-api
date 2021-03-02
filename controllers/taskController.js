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

export { createTask }