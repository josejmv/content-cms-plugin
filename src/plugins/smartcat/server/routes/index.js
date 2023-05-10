module.exports = [
  {
    method: "GET",
    path: "/get-project",
    handler: "myController.index",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/upload-document",
    handler: "myController.uploadDocument",
    config: {
      policies: [],
    },
  },
];
