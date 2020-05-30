const db = require("../../data/dbConfig");

const getResources = () => db("resources");

const getProjects = () => db("projects");

const getTasks = () => {
  return db("tasks as t")
    .select(
      "t.id as task_id",
      "t.description as task_description",
      "t.notes as task_notes",
      "t.completed as task_completed",
      "p.name as project_name",
      "p.description as project_description"
    )
    .join("projects as p", "t.project_id", "p.id");
};

const getResourceById = id => db("resources").where({ id }).first();

const getProjectById = id => db("projects").where({ id }).first();

const getTaskById = id => db("tasks").where({ id }).first();

const addResource = newResource => {
  return db("resources as r").insert(newResource);
};

const syncProjectsResources = projectResourcePair => {
  return db("project_resources").insert(projectResourcePair);
};

const addProject = newProject => db("projects").insert(newProject);

const addTask = newTask => db("tasks").insert(newTask);

module.exports = {
  addResource,
  syncProjectsResources,
  addProject,
  addTask,
  getResources,
  getProjects,
  getTasks,
  getResourceById,
  getProjectById,
  getTaskById,
};
