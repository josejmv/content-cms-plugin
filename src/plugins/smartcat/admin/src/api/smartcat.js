import { request } from "@strapi/helper-plugin";

export const SmartcatApi = {
  getTranslations: async () => {
    return await request("/smartcat", { method: "GET" });
  },
  saveTranslation: async (props) => {
    return await request("/smartcat/create", {
      body: props,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  },
  deleteTranslation: async (props) => {
    return await request("/smartcat/delete", {
      body: props,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  },

  // external api
  getProject: async () => {
    return await request("/smartcat/get-project", { method: "GET" });
  },
  uploadDocument: async (props) => {
    return await request("/smartcat/upload-document", {
      body: props,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  },
  deleteDocument: async (props) => {
    return await request("/smartcat/delete-document", {
      body: props,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  },
};
