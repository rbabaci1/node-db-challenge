const express = require("express");
const helmet = require("helmet");

const server = express();

const projectsRouter = require("./projectsRouter");
const resourcesRouter = require("./resourcesRouter");
const tasksRouter = require("./tasksRouter");

server.use(express.json());
server.use(helmet());
server.use("/api/projects", projectsRouter);
server.use("/api/resources", resourcesRouter);
server.use("/api/tasks", tasksRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "API is up!!!" });
});

const errorHandler = (error, req, res, next) => {
  const code = error.status || error.statusCode || 500;

  res.status(code).json(error);
};

server.use(errorHandler);

module.exports = server;
