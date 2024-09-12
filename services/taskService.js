var slugify = require('slugify');
const asyncHandlerr = require('express-async-handler');

const task = require('../models/tasks');

exports.gettasks = asyncHandlerr(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const tasks = await task.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: tasks.length, page, data: tasks });
});

exports.gettask = asyncHandlerr(async (req, res) => {
    const { id } = req.params;
    const taskItem = await task.findById(id);
    if (!taskItem) {
        return res.status(404).json({ msg: `No task for this id ${id}` });
    }
    res.status(200).json({ data: taskItem });
});

exports.createtask = asyncHandlerr(async (req, res) => {
    const { task: taskName, completed } = req.body;
    if (!taskName || typeof taskName !== 'string') {
        return res.status(400).json({ msg: 'Invalid or missing task name' });
    }
    const newTask = await task.create({ 
        task: taskName, 
        slug: slugify(taskName), 
        completed: completed || false 
    });
    res.status(201).json({ data: newTask });
});

exports.updatetask = asyncHandlerr(async (req, res) => {
    const { id } = req.params;
    const { task: taskName, completed } = req.body;
    if (!taskName || typeof taskName !== 'string') {
        return res.status(400).json({ msg: 'Invalid or missing task name' });
    }
    const updatedTask = await task.findOneAndUpdate(
        { _id: id },
        { 
            task: taskName, 
            slug: slugify(taskName), 
            completed: completed || false 
        },
        { new: true }
    );
    if (!updatedTask) {
        return res.status(404).json({ msg: `No task for this id ${id}` });
    }
    res.status(200).json({ data: updatedTask });
});

exports.deletetask = asyncHandlerr(async (req, res) => {
    const { id } = req.params;
    const deletedTask = await task.findByIdAndDelete(id);
    if (!deletedTask) {
        return res.status(404).json({ msg: `No task for this id ${id}` });
    }
    res.status(204).send();
});
