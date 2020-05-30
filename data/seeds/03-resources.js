exports.seed = function (knex) {
  return knex("resources")
    .del()
    .then(function () {
      return knex("resources").insert([
        {
          id: 1,
          name: "Stack OverFlow",
          description: "Google it",
        },
        { id: 2, name: "LambdaSchool", description: "Try it" },
        {
          id: 3,
          name: "Google",
          description: "Start searching",
        },
        { id: 4, name: "Library", description: "Walk there" },
        { id: 5, name: "Taken notes", description: "Find them" },
      ]);
    });
};
