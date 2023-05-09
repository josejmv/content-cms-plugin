"use strict";

// require axios
const axios = require("axios");

module.exports = ({ strapi }) => ({
  /**
   *
   */
  async getProject() {
    const domain = "https://smartcat.com";
    const endpoint = "api/integration/v1/project";
    const projectId = "d05ee031-cee1-49fe-8bc1-60f948082ee0";

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
});
