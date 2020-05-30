const getUndefinedProps = body => {
  let undefinedProps = [];

  Object.keys(body).forEach(prop => {
    if (body[prop] === undefined) undefinedProps.push(prop);
  });

  return undefinedProps.length ? undefinedProps : false;
};

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

module.exports = { validateId, validateBody };
