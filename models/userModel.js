import mongoose from 'mongoose'

//individual tasks
const taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    complete: { type: Boolean, required: true, default: false},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    followers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
}, {
    timestamps: true
})

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

    tasks: [taskSchema],
    
    following: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]


}, {
    timestamps: true
}
)

const User = mongoose.model('User', userSchema)

export default User