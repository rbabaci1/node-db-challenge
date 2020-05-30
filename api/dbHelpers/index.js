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

const getProjectTasks = project_id => {
  return db("tasks as t")
    .select("t.id", "t.description", "t.notes", "t.completed")
    .where({ project_id });
};

const getProjectResources = project_id => {
  return db("resources as r")
    .select("r.*")
    .join("project_resources as p_r", "r.id", "p_r.resource_id")
    .where({ project_id });
};

const getTaskById = id => db("tasks").where({ id }).first();

const addResource = newResource => {
  return db("resources as r").insert(newResource);
};

const syncProjectResource = projectResourcePair => {
  return db("project_resources").insert(projectResourcePair);
};

const addProject = newProject => db("projects").insert(newProject);

const addTask = newTask => db("tasks").insert(newTask);

module.exports = {
  addResource,
  syncProjectResource,
  addProject,
  addTask,
  getResources,
  getProjects,
  getTasks,
  getResourceById,
  getProjectById,
  getProjectTasks,
  getProjectResources,
  getTaskById,
};
