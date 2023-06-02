import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const port = 8000;
app.use(cors());

await mongoose.connect('mongodb://127.0.0.1/taskmanager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['Incomplete', 'Complete'],
        default: 'Incomplete',
    },
});

const Task = mongoose.model('Task', taskSchema);

app.use(bodyParser.json());

app.post('/api/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;

        const status = req.body.status || 'Incomplete';

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const newTask = new Task({
            title,
            description,
            status,
        });
        await newTask.save();
        res.status(201).send('Task created successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);

        res.json({
            _id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { status },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).send('Task not found');
        }

        res.send(updatedTask);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).send('Task not found');
        }

        res.send(deletedTask);
        // res.send('Task deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export { app };
