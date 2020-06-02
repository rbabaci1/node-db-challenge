exports.seed = function (knex) {
  return knex("projects")
    .del()
    .then(function () {
      return knex("projects").insert([
        {
          id: 1,
          name: "C++ Operating System",
          description: "Coding",
          completed: false,
        },
        {
          id: 2,
          name: "Delivery App",
          description: "Design",
          completed: false,
        },
        {
          id: 3,
          name: "History Essay",
          description: "Writing",
          completed: false,
        },
        {
          id: 4,
          name: "Math",
          description: "Counting",
          completed: false,
        },
        {
          id: 5,
          name: "English",
          description: "reading",
          completed: false,
        },
      ]);
    });
};
