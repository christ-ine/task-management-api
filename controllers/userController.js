import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Task from '../models/taskModel.js'

//@desc Create a user
//@route POST /api/users
const createUser = asyncHandler(async (req, res) => {
    const { userName } = req.body

    const userExists = await User.findOne({ userName })

    if(userExists){
        res.status(400)
        throw new Error('User already esists')
    }

    const user = await User.create({
        userName
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            userName: user.userName,
            isAdmin: user.isAdmin,
            tasks: user.tasks,
            following: user.following
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})

// const updateTaskFollowing = asyncHandler(async (req, res) => {
//     const task = await Task.findById(req.params.id)
    
//     if (task) {

//         const alreadyFollowing = task.followers.find(f.user._id)
//     }
// })

const completedTasks = asyncHandler(async (req, res) => {
    const task = await Task.find({complete: true, user: req.params.id})

    if (task) {
        res.json(task)
    } else {
        res.status(400)
        throw new Error('No completed tasks')
    }
})

const incompleteTasks = asyncHandler(async (req, res) => {
    const task = await Task.find({complete: false, user: req.params.id})

    if (task) {
        res.json(task)
    } else {
        res.status(400)
        throw new Error('All tasks complete')
    }
})

export { createUser, completedTasks, incompleteTasks }