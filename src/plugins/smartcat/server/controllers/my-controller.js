"use strict";

module.exports = ({ strapi }) => ({
  async index(ctx) {
    ctx.body = await strapi
      .plugin("smartcat")
      .service("myService")
      .getProject();
  },
});
