const db = require("../../data/dbConfig");

const getResources = () => db("resources");

const getProjects = () => db("projects");

const getTasks = () =>
  db("tasks as t")
    .select(
      "t.id",
      "t.descriptions as task_description",
      "t.notes",
      "t.completed",
      "p.name",
      "p.description"
    )
    .join("projects as p", "t.project_id", "p.id");

const getResourceById = id => db("resources").where({ id }).first();

const getProjectById = id => db("projects").where({ id }).first();

const getTaskById = id => db("tasks").where({ id }).first();

const addResource = newResource => db("resources").insert(newResource);

const addProject = newProject => db("projects").insert(newProject);

const addTask = newTask => db("tasks").insert(newTask);

module.exports = {
  addResource,
  addProject,
  addTask,
  getResources,
  getProjects,
  getTasks,
  getResourceById,
  getProjectById,
  getTaskById,
};
