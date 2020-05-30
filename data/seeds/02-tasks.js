exports.seed = function (knex) {
  return knex("tasks")
    .del()
    .then(function () {
      return knex("tasks").insert([
        {
          id: 1,
          description: "Design the landing page",
          notes: "Use Figma",
          completed: false,
          project_id: 2,
        },
        {
          id: 2,
          description: "Implement the algorithm",
          notes: "Plan before codin",
          completed: false,
          project_id: 1,
        },
        {
          id: 3,
          description: "Collect all the essay info",
          notes: "Read the book again",
          completed: false,
          project_id: 3,
        },
        {
          id: 4,
          description: "Design the icons",
          notes: "Use PhotoShop",
          completed: false,
          project_id: 2,
        },
        {
          id: 5,
          description: "Collect design images",
          notes: "Use PixaBay",
          completed: false,
          project_id: 2,
        },
      ]);
    });
};
