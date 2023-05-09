module.exports = [
  {
    method: "GET",
    path: "/get-project",
    handler: "myController.index",
    config: {
      policies: [],
    },
  },
];
