import mongoose from 'mongoose'

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

    tasks: [
        {
            task: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task'
            }
        }
    ],

    following: [
        {
            task: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task'
            }
        }
    ]


}, {
    timestamps: true
}
)

const User = mongoose.model('User', userSchema)

export default User