const express = require("express");

const { getResources } = require("../dbHelpers");
const { getUndefinedProps } = require("../../utils");

const router = express.Router();

router.post("/resources", async (req, res, next) => {
  try {
    const [addedResourceId] = await addResource(req.body);
  } catch ({ errno, code, message }) {
    next({
      message: "The resource could not be retrieved at this moment.",
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

/*********************  Validation Middleware ********************/
function validateBody(tableName) {
  return (req, res, next) => {
    const { name, description } = req.body;

    const results =
      tableName === "resources"
        ? getUndefinedProps({ name, description })
        : getUndefinedProps({ name, quantity });

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
