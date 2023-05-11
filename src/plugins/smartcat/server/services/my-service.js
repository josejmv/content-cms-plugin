"use strict";

// require axios
const axios = require("axios");

module.exports = ({ strapi }) => {
  const domain = "https://smartcat.com";
  const projectId = "d05ee031-cee1-49fe-8bc1-60f948082ee0";

  return {
    /**
     * get project from smartcat
     */
    async getTranslations() {
      try {
        const data = await strapi.entityService.findMany(
          "plugin::smartcat.translation"
        );

        return { translations: data };
      } catch (error) {
        return { translations: [] };
      }
    },

    async saveTranslation(ctx) {
      const { id, targetLanguage, sourceLanguage, filename, articleId } =
        ctx.request.body;

      try {
        const data = await strapi.entityService.create(
          "plugin::smartcat.translation",
          {
            data: {
              filename,
              articleId,
              targetLanguage,
              sourceLanguage,
              translationId: id,
            },
          }
        );

        return { translation: data };
      } catch (error) {
        return { translation: { error: true } };
      }
    },

    /**
     * delete translation
     */
    async deleteTranslation(ctx) {
      const { id } = ctx.request.body;

      try {
        const data = await strapi.entityService.delete(
          "plugin::smartcat.translation",
          id
        );

        return { translation: data };
      } catch (error) {
        return { translation: { error: true } };
      }
    },

    // ---------------------------------- SMARTCAT ----------------------------------

    /**
     * get project from smartcat
     */
    async getProject() {
      const endpoint = "api/integration/v1/project";

      const { data } = await axios({
        method: "GET",
        url: `${domain}/${endpoint}/${projectId}`,
        headers: {
          Authorization:
            "Basic NmU2YzUzNWUtZjUyMi00YWMyLWFlMmEtMmM4YjVkMzliZGFmOjNfM3oxdTRLdzc2dmVpM0w0Vnc3dDdJUjNJYg==",
        },
      });

      return { data };
    },

    /**
     * upload document to smartcat
     */
    async uploadDocument(ctx) {
      const endpoint = "api/integration/v1/project/document";
      const { article, targetLanguages } = ctx.request.body;

      const file = new Blob([JSON.stringify(article.formatedJson)], {
        type: "text/plain",
      });

      const formData = new FormData();
      formData.set("file", file, `article-${article.id}.json`);

      const { data } = await axios({
        method: "POST",
        data: formData,
        url: `${domain}/${endpoint}`,
        params: { projectId, targetLanguages },
        headers: {
          Authorization:
            "Basic NmU2YzUzNWUtZjUyMi00YWMyLWFlMmEtMmM4YjVkMzliZGFmOjNfM3oxdTRLdzc2dmVpM0w0Vnc3dDdJUjNJYg==",
        },
      });

      return data;
    },

    /**
     * delete document from smartcat
     */
    async deleteDocument(ctx) {
      const endpoint = "api/integration/v1/document";
      const { id } = ctx.request.body;

      await axios({
        method: "DELETE",
        url: `${domain}/${endpoint}`,
        params: { documentIds: id },
        headers: {
          Authorization:
            "Basic NmU2YzUzNWUtZjUyMi00YWMyLWFlMmEtMmM4YjVkMzliZGFmOjNfM3oxdTRLdzc2dmVpM0w0Vnc3dDdJUjNJYg==",
        },
      });

      return { success: true };
    },
  };
};
