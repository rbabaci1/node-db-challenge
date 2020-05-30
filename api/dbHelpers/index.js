const db = require("../../data/dbConfig");

const getResources = () => db("resources");

const getResourceById = id => db("resources").where({ id }).first();

const addResource = newResource => db("resources").insert(newResource);

module.exports = {
  addResource,
  getResources,
  getResourceById,
};
