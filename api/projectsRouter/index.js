const express = require("express");

const { getResources } = require("../dbHelpers");

const router = express.Router();

router.get("/resources", async (req, res, next) => {
  try {
    const resources = await getResources();

    res.status(200).json(resources);
  } catch ({ errno, code, message }) {
    next({
      message: "The recipes could not be retrieved at this moment.",
      errno,
      code,
      reason: message,
    });
  }
});

module.exports = router;
