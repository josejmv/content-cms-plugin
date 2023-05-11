import { request } from "@strapi/helper-plugin";

export const articlesApi = {
  getArticles: async () => {
    return await request("/api/articles?locale=all", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer 40ca006fa8c961ec3dbd6329dc8d865a582f16fe2510c3b4ed494893ffc6f3e45e5ff81d8c69b2b35c86b7017d0c501034e4e86cfff4eac76d0a2cbdf456b9469912097beb5862ddbb0276035ecff334b396fc8b7f8621e2e878c9004e372be0249d99340792ae32c7bb484ae87e95753fd7eac9ff3953dbc31f8595bced7ca9",
      },
    });
  },
};
