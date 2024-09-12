const mongoose=require('mongoose')

const taskSchema  = new mongoose.Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false }
},
{timestamps: true}
);

const tasks= mongoose.model('tasks',taskSchema);

module.exports=tasks;