const express = require("express");

const { validateId, validateBody } = require("../../utils");
const {
  addResource,
  addProject,
  addTask,
  getResources,
  getProjects,
  getTasks,
  getResourceById,
  getProjectById,
  getTaskById,
  syncProjectResource,
} = require("../dbHelpers");

const router = express.Router();

router.post(
  "/:id/resources",
  validateId("projects"),
  validateBody("resources"),
  async (req, res, next) => {
    try {
      const project_id = req.params.id;

      const [resource_id] = await addResource(req.body);
      await syncProjectResource({ project_id, resource_id });
      const addedResource = await getResourceById(addedResourceId);

      res.status(201).json(addedResource);
    } catch ({ errno, code, message }) {
      next({
        message: "The resource could not be added at this moment.",
        errno,
        code,
        reason: message,
      });
    }
  }
);

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
    res.status(200).json(req.project);
  } catch ({ errno, code, message }) {
    next({
      message: "The project could not be retrieved at this moment.",
      errno,
      code,
      reason: message,
    });
  }
});

router.post("/tasks", validateBody("tasks"), async (req, res, next) => {
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

module.exports = router;
