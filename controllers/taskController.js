import asyncHandler from 'express-async-handler'
import Task from '../models/taskModel.js'

//@desc Create new task
//@route POST /api/tasks/
const createTask = asyncHandler(async (req, res) => {
    const { title, content, user } = req.body
    
        const task = await Task.create({
            title,
            content,
            user
        })
    
        if(task){
            res.status(201).json({
                _id: task._id,
                title: task.title,
                content: task.content,
                user: task.user,
                followers: task.followers
            })
        } else {
            res.status(400)
            throw new Error('Invalid task input')
        }
    
})

//@desc Edit task title and content
//@route PUT /api/tasks/:id
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

//@desc Mark task as complete or incomplete
//@route PUT /api/tasks/:id/status
const updateTaskStatus = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)


        if(task.complete === false) {
            task.complete = true

            await task.save()

            res.json({message: 'task completed!'})
        } else if (task.complete === true) {
            task.complete = false

            await task.save()

            res.json({message: 'task incomplete!'})
        } else
        {
            res.status(404)
            throw new Error('Task not found')
        }
    
})

//@desc Delete task
//@route DELETE /api/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)


        if(task) {
           await task.remove()
           res.json({ message: 'Task deleted'})
        } else {
            res.status(404)
            throw new Error('Task not found')
        }
    
})


export { createTask, updateTask, updateTaskStatus, deleteTask }