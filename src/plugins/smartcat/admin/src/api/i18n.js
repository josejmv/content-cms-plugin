import { request } from "@strapi/helper-plugin";

export const i18nApi = {
  getLocales: async () => {
    return await request("/i18n/locales", { method: "GET" });
  },
};
