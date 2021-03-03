import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Task from '../models/taskModel.js'

//@desc Create a user
//@route POST /api/users/
const createUser = asyncHandler(async (req, res) => {
    const { userName } = req.body

    const userExists = await User.findOne({ userName })

    if(userExists){
        res.status(400)
        throw new Error('Username is taken')
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

//@desc Follow/unfollow tasks
//@route PUT /api/users/:taskId/follow
const updateTaskFollowing = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.taskId)
    const user = await User.findById(req.body._id)

    if(task){
        const alreadyFollowing = user.following.find(f => f._id.toString() === req.params.taskId.toString())

        if(alreadyFollowing){
            user.following.pull(task)
            task.followers.pull(user)

            await user.save()
            await task.save()
            res.status(201).json({message: 'task unfollowed'})
            
        } else {
            user.following.push(task)
            task.followers.push(user)

            await task.save()
            const userFollowing = await user.save()
            res.status(201).json(userFollowing)
        }

        

    } else {
        res.status(404)
        throw new Error('Task not found')
    }
   
})

//@desc View user's following list
//@route GET /api/users/:id/followlist
const followingList = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user){

        if(user.following.length === 0){
            res.status(201).json({message: 'Not following any tasks}'})
        }

        res.status(201).json(user.following)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc View user's completed tasks
//@route GET /api/users/:id/completed
const completedTasks = asyncHandler(async (req, res) => {
    const task = await Task.find({complete: true, user: req.params.id})

    if (task) {
        res.status(201).json(task)
    } else {
        res.status(400)
        throw new Error('No completed tasks')
    }
})

//@desc View user's incomplete tasks
//@route GET /api/users/:id/incomplete
const incompleteTasks = asyncHandler(async (req, res) => {
    const task = await Task.find({complete: false, user: req.params.id})

    if (task) {
        res.status(201).json(task)
    } else {
        res.status(400)
        throw new Error('All tasks complete')
    }
})

//@desc Delete user, their tasks, and following list
//@route DELETE /api/users/:id/deleteuser
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    const task = await Task.find({user: req.params.id })
    const taskFollower = await Task.find({followers: req.params.id})

    if(user){

        taskFollower.map(x => {
            x.followers.pull(user)
            x.save()
        })
        
        task.map(t => t.remove())
        await user.remove()
        res.status(201).json({message: 'user deleted'})
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export { createUser, completedTasks, incompleteTasks, updateTaskFollowing, followingList, deleteUser }