const express = require("express");

const router = express.Router();

const { validateId, validateBody } = require("../../utils");
const {
  addProject,
  getProjects,
  getProjectById,
  getProjectTasks,
} = require("../dbHelpers");

router.post("/", validateBody("projects"), async (req, res, next) => {
  try {
    const { body } = req;
    const newProject = {
      ...body,
      ...(!body.completed && { completed: false }),
    };

    const [addedProjectId] = await addProject(newProject);
    const addedProject = await getProjectById(addedProjectId);

    res.status(201).json(addedProject);
  } catch ({ errno, code, message }) {
    next({
      message: "The project could not be added at this moment.",
      errno,
      code,
      reason: message,
    });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const resources = await getProjects();

    res.status(200).json(resources);
  } catch ({ errno, code, message }) {
    next({
      message: "The projects could not be retrieved at this moment.",
      errno,
      code,
      reason: message,
    });
  }
});

router.get("/:id", validateId("projects"), async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await getProjectById(id);
    const tasks = await getProjectTasks(id);

    res.status(200).json({ ...project, tasks });
  } catch ({ errno, code, message }) {
    next({
      message: "The project could not be retrieved at this moment.",
      errno,
      code,
      reason: message,
    });
  }
});

module.exports = router;
