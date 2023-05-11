module.exports = [
  {
    path: "/",
    method: "GET",
    config: { policies: [] },
    handler: "myController.index",
  },
  {
    method: "POST",
    path: "/create",
    config: { policies: [] },
    handler: "myController.saveTranslation",
  },
  {
    method: "POST",
    path: "/delete",
    config: { policies: [] },
    handler: "myController.deleteTranslation",
  },
  {
    method: "GET",
    path: "/get-project",
    config: { policies: [] },
    handler: "myController.getProject",
  },
  {
    method: "POST",
    path: "/upload-document",
    config: { policies: [] },
    handler: "myController.uploadDocument",
  },
  {
    method: "POST",
    path: "/delete-document",
    config: { policies: [] },
    handler: "myController.deleteDocument",
  },
];
