import mongoose from 'mongoose'

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

const Task = mongoose.model('Task', taskSchema)

export default Task