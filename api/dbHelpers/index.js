const db = require("../../data/dbConfig");

const getResources = () => db("resources");

const getProjects = () => db("projects");

const getResourceById = id => db("resources").where({ id }).first();

const getProjectById = id => db("projects").where({ id }).first();

const addResource = newResource => db("resources").insert(newResource);

const addProject = newProject => db("projects").insert(newProject);

module.exports = {
  addResource,
  addProject,
  getResources,
  getProjects,
  getResourceById,
  getProjectById,
};
