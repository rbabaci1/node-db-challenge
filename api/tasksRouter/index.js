const express = require("express");

const { getTasks } = require("../dbHelpers");

const router = express.Router();

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
