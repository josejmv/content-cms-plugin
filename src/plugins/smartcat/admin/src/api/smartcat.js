import { request } from "@strapi/helper-plugin"; // puedes revisar si se puede usar axios, aunque tendrias que agregar completamente la URL

export const getProject = async () => {
  const data = await request("/smartcat/get-project", { method: "GET" });
  return data;
};

export const uploadDocument = async (props) => {
  const data = await request("/smartcat/upload-document", {
    body: props,
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return data;
};
