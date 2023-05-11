"use strict";

module.exports = ({ strapi }) => ({
  async index(ctx) {
    ctx.body = await strapi
      .plugin("smartcat")
      .service("myService")
      .getTranslations();
  },

  async saveTranslation(ctx) {
    ctx.body = await strapi
      .plugin("smartcat")
      .service("myService")
      .saveTranslation(ctx);
  },

  async deleteTranslation(ctx) {
    ctx.body = await strapi
      .plugin("smartcat")
      .service("myService")
      .deleteTranslation(ctx);
  },

  async getProject(ctx) {
    ctx.body = await strapi
      .plugin("smartcat")
      .service("myService")
      .getProject();
  },

  async uploadDocument(ctx) {
    ctx.body = await strapi
      .plugin("smartcat")
      .service("myService")
      .uploadDocument(ctx);
  },

  async deleteDocument(ctx) {
    ctx.body = await strapi
      .plugin("smartcat")
      .service("myService")
      .deleteDocument(ctx);
  },
});
