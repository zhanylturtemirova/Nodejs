import express from 'express'
import mongoose from 'mongoose';
import Task from  './models/tasks.model.js'
import 'dotenv/config'

const app = express()

app.use(express.json())

const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER

const mongoURI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/?retryWrites=true&w=majority&appName=BackendDB`

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log(err)
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/api/tasks', async(req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error fetching tasks' })
    }
})
app.get('/api/task/:id', async(req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.status(200).json(task )
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})
app.post('/api/tasks', async(req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
        console.log(task)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error creating task' })
    }
})

app.put('/api/task/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body)

        if(!task){
            return res.status(404).json({ message: 'Task not found' })
        }
        const updatedTask = await Task.findById(req.params.id)
        res.status(200).json(updatedTask)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error updating task' })
    }
})

app.delete("/api/task/:id", async(req, res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({message: 'Task not found'})
        }
        res.status(200).json(task)
    } catch(err){
        res.status(500).json({message: 'Error deleting task'})
    }
})