import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    
    completedAt: {
        type: Date
    },  
    completed: Boolean
})

const Task = mongoose.model('Task', TaskSchema)

export default Task

 