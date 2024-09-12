const express = require('express');

const {
    gettasks,
    gettask,
    createtask,
    updatetask,
    deletetask
} = require("../services/taskService")

const router = express.Router();

router.route('/').get(gettasks).post(createtask);
router.route("/:id")
.get(gettask)
.put(updatetask)
.delete(deletetask);

module.exports = router;