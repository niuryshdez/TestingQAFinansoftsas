const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    screenshotsFolder: "cypress/evidence/screenshots",
    videosFolder: "cypress/evidence/videos",
    setupNodeEvents() {},
  },
});
