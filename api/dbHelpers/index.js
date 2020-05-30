const db = require("../../data/dbConfig");

const getResources = () => db("resources");

const getResourceById = id => db("resources").where({ id }).first();

module.exports = { getResources, getResourceById };
