const db = require("../../data/dbConfig");

const getResources = () => db("resources");

const getResourceById = id => db("resources").where({ id }).first();

const addResource = newResource => db("resources").insert(newResource);

const updateProjectResource = ids => db("project_resources").insert(ids);

module.exports = {
  addResource,
  updateProjectResource,
  getResources,
  getResourceById,
};
