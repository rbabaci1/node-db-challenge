const express = require("express");

const { getUndefinedProps } = require("../../utils");
const {
  addResource,
  addProject,
  getResources,
  getProjects,
  getTasks,
  getResourceById,
  getProjectById,
} = require("../dbHelpers");

const router = express.Router();

router.post("/resources", validateBody("resources"), async (req, res, next) => {
  try {
    const [addedResourceId] = await addResource(req.body);
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
});

router.get("/resources", async (req, res, next) => {
  try {
    const resources = await getResources();

    res.status(200).json(resources);
  } catch ({ errno, code, message }) {
    next({
      message: "The resources could not be retrieved at this moment.",
      errno,
      code,
      reason: message,
    });
  }
});

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

router.get("/tasks", async (req, res, next) => {
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

/*********************  Validation Middleware ********************/
function validateBody(tableName) {
  return (req, res, next) => {
    const { name, description } = req.body;

    const results =
      tableName === "resources"
        ? getUndefinedProps({ name, description })
        : getUndefinedProps({ name });

    if (!results) {
      next();
    } else {
      res.status(400).json({
        message: `👉🏼 [ ${results.join(
          " | "
        )} ] 👈🏼 missing or incorrectly defined in the request body.`,
      });
    }
  };
}

module.exports = router;
