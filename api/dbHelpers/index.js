const db = require("../../data/dbConfig");

const getResources = () => db("resources");

module.exports = { getResources };
