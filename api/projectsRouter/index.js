const express = require("express");

const { getUndefinedProps } = require("../../utils");
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

/*********************  Validation Middleware ********************/
function validateId(tableName) {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const item =
        tableName === "projects"
          ? await getProjectById(id)
          : (tableName = "resources")
          ? await getResourceById(id)
          : await getTaskById(id);

      if (item) {
        req[
          tableName === "projects"
            ? "project"
            : (tableName = "tasks" ? "task" : "resource")
        ] = item;
        next();
      } else {
        next({
          status: 404,
          message: `The ${
            tableName === "projects"
              ? "project"
              : tableName === "tasks"
              ? "task"
              : "resource"
          } with the specified ID does not exist.`,
        });
      }
    } catch (err) {
      next({
        error: `The  ${
          tableName === "projects"
            ? "project"
            : tableName === "tasks"
            ? "task"
            : "resource"
        } info could not be retrieved at this moment.`,
        reason: err.message,
      });
    }
  };
}

function validateBody(tableName) {
  return (req, res, next) => {
    const { name, description } = req.body;

    const results =
      tableName === "resources"
        ? getUndefinedProps({ name, description })
        : tableName === "projects"
        ? getUndefinedProps({ name })
        : getUndefinedProps({ description });

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
