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
            
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task'
            
        }
    ],

    following: [
        {
            
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task'
            
        }
    ]


}, {
    timestamps: true
}
)

const User = mongoose.model('User', userSchema)

export default User