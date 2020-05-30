exports.seed = function (knex) {
  return knex("resources")
    .del()
    .then(function () {
      return knex("resources").insert([
        {
          id: 1,
          name: "Stack OverFlow",
          description: "Google it",
          project_id: 3,
        },
        { id: 2, name: "LambdaSchool", description: "Try it", project_id: 3 },
        {
          id: 3,
          name: "Google",
          description: "Start searching",
          project_id: 3,
        },
        { id: 4, name: "Library", description: "Walk there", project_id: 1 },
        { id: 5, name: "Taken notes", description: "Find them", project_id: 4 },
      ]);
    });
};
