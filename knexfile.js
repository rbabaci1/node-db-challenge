module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/projects.db",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
