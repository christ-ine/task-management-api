import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

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

export { createUser }