const db = require("../../data/dbConfig");

const getResources = () => db("resources");

const getResourceById = id => db("resources").where({ id }).first();

const addResource = newResource => db("resources").insert(newResource);

const addProject = newProject => db("project").insert(newProject);

module.exports = {
  addResource,
  addProject,
  getResources,
  getResourceById,
};
