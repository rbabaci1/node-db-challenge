const express = require("express");

const router = express.Router();

const {
  addResource,
  updateProjectResource,
  getResources,
  getResourceById,
} = require("../dbHelpers");
const { validateId, validateBody } = require("../../utils");

router.post(
  "/:id",
  validateId("projects"),
  validateBody("resources"),
  async (req, res, next) => {
    try {
      const project_id = req.params.id;

      const [resource_id] = await addResource(req.body);
      await updateProjectResource({ project_id, resource_id });
      const addedResource = await getResourceById(resource_id);

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

router.get("/", async (req, res, next) => {
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

module.exports = router;
