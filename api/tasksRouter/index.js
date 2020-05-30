const express = require("express");

const router = express.Router();

const { addTask, getTaskById, getTasks } = require("../dbHelpers");
const { validateBody } = require("../../utils");

router.post("/", validateBody("tasks"), async (req, res, next) => {
  try {
    const { body } = req;
    const newTask = {
      ...body,
      ...(!body.completed && { completed: false }),
    };

    const [addedTaskId] = await addTask(newTask);
    const addedTask = await getTaskById(addedTaskId);

    res.status(201).json(addedTask);
  } catch ({ errno, code, message }) {
    next({
      message: "The task could not be added at this moment.",
      errno,
      code,
      reason: message,
    });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const resources = await getTasks();

    res.status(200).json(resources);
  } catch ({ errno, code, message }) {
    next({
      message: "The tasks could not be retrieved at this moment.",
      errno,
      code,
      reason: message,
    });
  }
});

module.exports = router;
